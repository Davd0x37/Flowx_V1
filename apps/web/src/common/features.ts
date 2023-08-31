// import { RouteRecordRaw } from 'vue-router';

// export interface FeatureLocales {
//   [key: PropertyKey]: Record<PropertyKey, unknown>;
// }

// export type FeatureRoutes = RouteRecordRaw;

// // export interface FeatureStore =

// export interface Feature {
//   [key: PropertyKey]: unknown;
//   locales: FeatureLocales;
//   routes: FeatureRoutes;
//   store: FeatureStore;
// }

// const featuresStore = new Map();

// export const getFeatures = () => featuresStore;

// export const getFeature = (featureName: string) => featuresStore.get(featureName);

// export const installFeature = (featureName: string, feature: Feature) => {
//   if (featuresStore.has(featureName)) return;

//   featuresStore.set(featureName, feature);

//   return feature;
// };
