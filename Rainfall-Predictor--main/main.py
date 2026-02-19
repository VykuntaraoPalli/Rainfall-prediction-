import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "dataset", "rainfall.csv")

try:
    df = pd.read_csv(DATA_PATH)
    print("✅ Data loaded successfully!")
    print(df.head())
except FileNotFoundError:
    print("❌ Error: rainfall.csv not found inside dataset folder.")
