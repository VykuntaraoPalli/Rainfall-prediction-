
import React from 'react';

const PythonCodeBlock: React.FC = () => {
  const code = `
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# 1. Data Collection
# The importance of data: ML models learn patterns from historical records.
# In agriculture, reliable rainfall data allows for optimized sowing cycles.
URL = "https://docs.google.com/spreadsheets/d/1RA2OO0LZTeQykI_mvnensAjp6LM4YzWI1Tz0SUG5-Ao/export?format=csv"
df = pd.read_csv(URL)

# 2. Data Pre-processing
print(df.shape)
print(df.info())

# Handle missing values
df = df.dropna()

# 3. Feature Engineering
# (Simplified: using monthly data to predict annual occurrence)
X = df[['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']]
# Assuming a threshold for 'Rainy Year' binary classification
y = (df['ANNUAL'] > 1000).astype(int) 

# 4. Split and Scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 5. Model Training (Decision Tree)
# The fit() method learns parameters from the training data.
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# 6. Prediction
# The predict() method uses the learned structure to classify new inputs.
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")
`;

  return (
    <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto border border-slate-700 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-emerald-400 font-mono text-sm">implementation_logic.py</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="text-slate-300 font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default PythonCodeBlock;
