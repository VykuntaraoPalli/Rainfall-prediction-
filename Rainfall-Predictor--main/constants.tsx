
import { ModelMetrics } from './types';

export const MODEL_PERFORMANCE: ModelMetrics[] = [
  {
    name: 'Logistic Regression',
    trainAccuracy: 0.82,
    testAccuracy: 0.80,
    description: 'Statistical model used for binary classification, predicting the probability of rainfall.'
  },
  {
    name: 'Decision Tree',
    trainAccuracy: 0.94,
    testAccuracy: 0.86,
    description: 'A tree-like structure where each internal node represents a test on an attribute.'
  },
  {
    name: 'Random Forest',
    trainAccuracy: 0.98,
    testAccuracy: 0.91,
    description: 'An ensemble of decision trees providing higher stability and accuracy.'
  },
  {
    name: 'K-Nearest Neighbors',
    trainAccuracy: 0.88,
    testAccuracy: 0.84,
    description: 'Classifies data points based on the proximity to other categorized data points.'
  },
  {
    name: 'SVM',
    trainAccuracy: 0.85,
    testAccuracy: 0.83,
    description: 'Finds the hyperplane that best separates data points into different classes.'
  },
  {
    name: 'XGBoost',
    trainAccuracy: 0.99,
    testAccuracy: 0.93,
    description: 'Optimized gradient boosting library designed to be highly efficient and flexible.'
  }
];

export const MOCK_CHART_DATA = [
  { year: '2010', rainfall: 1100 },
  { year: '2011', rainfall: 1050 },
  { year: '2012', rainfall: 980 },
  { year: '2013', rainfall: 1250 },
  { year: '2014', rainfall: 1020 },
  { year: '2015', rainfall: 1150 },
  { year: '2016', rainfall: 1180 },
  { year: '2017', rainfall: 1120 },
  { year: '2018', rainfall: 1090 },
  { year: '2019', rainfall: 1300 },
];
