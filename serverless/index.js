const axios = require('axios');

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./firebase-connection.json");

initializeApp({
    credential: cert(serviceAccount),
});
  
const db = getFirestore();

module.exports = async function (context, myTimer) {
  // GC Funcs
  try {
    const response = await axios.get(
      "https://cloudbilling.googleapis.com/v1/services/29E7-DA93-CA13/skus?key=AIzaSyBLnDnE9-G8Ch5T_7HWYnuqEWqAH4cL_Tw"
    );
    const skus = response.data.skus;
    const invocationsSKU = skus.filter(
      (sku) => sku.skuId === "8E10-82EB-6917"
    )[0];
    const invocationsNanos =
      invocationsSKU.pricingInfo[0].pricingExpression.tieredRates[1].unitPrice
        .nanos;
    const invocationsPrice = parseFloat((invocationsNanos / 1000).toFixed(2));
    db.collection("cloud-functions")
      .doc("mDLa6XO1dA0UtuQHUC2B")
      .update({ costPerMillion: invocationsPrice });
  } catch (error) {
    console.log(error);
  }

  // GC Storage
  try {
    const response = await axios.get(
      "https://cloudbilling.googleapis.com/v1/services/95FF-2EF5-5EA1/skus?key=AIzaSyBLnDnE9-G8Ch5T_7HWYnuqEWqAH4cL_Tw"
    );
    const skus = response.data.skus;
    const americaSKU = skus.filter((sku) => sku.skuId === "E5F0-6A5D-7BAD")[0];
    const storageNanos =
      americaSKU.pricingInfo[0].pricingExpression.tieredRates[1].unitPrice
        .nanos;
    const storagePrice = parseFloat((storageNanos / 1000000000).toFixed(2));
    db.collection("storage")
      .doc("nmwvgxymyF2R00UJikXy")
      .update({ prices: [storagePrice] });
  } catch (error) {
    console.log(error);
  }

  // GC VMs (NOT FINISHED)
  try {
    const response = await axios.get(
      "https://cloudbilling.googleapis.com/v1/services/6F81-5844-456A/skus?key=AIzaSyBLnDnE9-G8Ch5T_7HWYnuqEWqAH4cL_Tw"
    );
    const skus = response.data.skus;
    const e2CloudAmericasSKU = skus.filter(
      (sku) => sku.skuId === "210D-FDFA-448C"
    )[0];
    const storageNanos =
      e2CloudAmericasSKU.pricingInfo[0].pricingExpression.tieredRates[0]
        .unitPrice.nanos;
    const vmPrice = parseFloat((storageNanos / 1000000000).toFixed(2));
    console.log(vmPrice);
  } catch (error) {
    console.log(error);
  }

  // SINGLE QUERY
  const azureQueryStr = "https://prices.azure.com/api/retail/prices?$filter=(serviceName eq 'Storage' and armRegionName eq 'eastus2' and productName eq 'Blob Storage' and skuName eq 'Hot LRS') or (productName eq 'Functions' and armRegionName eq 'eastus2')";

  const response = await axios.get(azureQueryStr);

  // Storage fields
  const storageRanges = [];
  const storagePrices = []; 
  let writePrice;
  let readPrice;

  // Cloud Function fields
  let freeTier;
  let cloudFuncPrice;

  for (const i in response.data.Items) {
    const obj = response.data.Items[i];
    if (obj.meterName === 'Hot LRS Data Stored') {
      storageRanges.push(obj.tierMinimumUnits);
      storagePrices.push(obj.retailPrice);
    }
    else if (obj.meterName === 'Hot LRS Write Operations') {
      writePrice = obj.retailPrice;
    }
    else if (obj.meterName === 'Hot Read Operations') {
      readPrice = obj.retailPrice;
    }
    else if ((obj.serviceName === 'Functions') && (obj.tierMinimumUnits >= 0)) {
      cloudFuncPrice = Number((obj.retailPrice * (10**5)).toFixed(1))
      freeTier = obj.tierMinimumUnits / (10**5);
    }
  }

  storageRanges.sort().shift();
  storageRanges[1] = storageRanges[1] - storageRanges[0];

  db.collection("storage")
  .doc("B5wtgT1uDm2XqXEw7Nrz")
  .update({ prices: storagePrices, ranges: storageRanges, read_cost_per_1000: readPrice, write_cost_per_1000: writePrice });

  db.collection('cloud-functions').doc('K9HrjhZ0vpJySl9Ucwll').update({ freeTier: freeTier, costPerMillion: cloudFuncPrice});

};

