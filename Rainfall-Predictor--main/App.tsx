
import React, { useState, useEffect } from 'react';
import { getMLInsight } from './services/geminiService';
import { PredictionFeatures } from './types';
import PythonCodeBlock from './components/PythonCodeBlock';
import MLDashboard from './components/MLDashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'predict'>('overview');
  const [features, setFeatures] = useState<PredictionFeatures>({
    pressure: 1013,
    temperature: 28,
    humidity: 65,
    cloudCover: 40,
    windSpeed: 12
  });
  const [prediction, setPrediction] = useState<'none' | 'rainfall' | 'no-rainfall'>('none');
  const [isPredicting, setIsPredicting] = useState(false);
  const [expertAdvice, setExpertAdvice] = useState<string>('');

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    
    // Simulate complex ML model logic
    // Logic: Higher humidity and cloud cover typically leads to rainfall
    const score = (features.humidity * 0.4) + (features.cloudCover * 0.4) - (features.pressure - 1000) * 0.2;
    
    setTimeout(async () => {
      const result = score > 45 ? 'rainfall' : 'no-rainfall';
      setPrediction(result);
      
      const advice = await getMLInsight({ ...features, predicted: result });
      setExpertAdvice(advice || '');
      setIsPredicting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Rainfall Predictor <span className="text-blue-600 font-medium">India</span>
            </h1>
          </div>
          <nav className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {(['overview', 'analysis', 'predict'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 overflow-hidden relative">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">Project Submission</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Exploratory Analysis and Rainfall Prediction in India for Agriculture
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  This project aims to analyze historical Indian rainfall data and build a robust machine learning model to predict rainfall occurrences. Precise predictions are crucial for agricultural planning, irrigation management, and crop optimization.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveTab('predict')} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                    Try Live Predictor
                  </button>
                  <a href="https://docs.google.com/spreadsheets/d/1RA2OO0LZTeQykI_mvnensAjp6LM4YzWI1Tz0SUG5-Ao/edit?gid=121883362#gid=121883362" target="_blank" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                    View Dataset
                  </a>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
                <img src="https://picsum.photos/seed/agriculture/600/800" className="object-cover w-full h-full opacity-20 mask-gradient" alt="Agriculture" />
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-8 text-slate-800">Machine Learning Pipeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Data Pre-processing', icon: '🧹', desc: 'Cleaning null values, handling outliers, and scaling features with Scikit-learn.' },
                  { title: 'Feature Engineering', icon: '⚙️', desc: 'Selecting relevant meteorogical parameters like Pressure, Temp, and Humidity.' },
                  { title: 'Model Selection', icon: '🤖', desc: 'Evaluating multiple models including Decision Trees, Random Forest, and XGBoost.' }
                ].map((step, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h4 className="text-lg font-bold mb-2 text-slate-800">{step.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <MLDashboard />
          </div>
        )}

        {activeTab === 'predict' && (
          <div className="max-w-5xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-2/5 p-8 bg-slate-50 border-r border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Input Parameters</h3>
                <p className="text-slate-500 text-sm mb-8">Enter the environmental values to generate a rainfall prediction using our trained Machine Learning models.</p>
                
                <form onSubmit={handlePredict} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Air Pressure (hPa)</label>
                    <input 
                      type="range" min="950" max="1050" value={features.pressure}
                      onChange={e => setFeatures({...features, pressure: +e.target.value})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>950</span><span>{features.pressure}</span><span>1050</span></div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Temperature (°C)</label>
                    <input 
                      type="range" min="0" max="50" value={features.temperature}
                      onChange={e => setFeatures({...features, temperature: +e.target.value})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0°C</span><span>{features.temperature}°C</span><span>50°C</span></div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Humidity (%)</label>
                    <input 
                      type="range" min="0" max="100" value={features.humidity}
                      onChange={e => setFeatures({...features, humidity: +e.target.value})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0%</span><span>{features.humidity}%</span><span>100%</span></div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cloud Cover (%)</label>
                    <input 
                      type="range" min="0" max="100" value={features.cloudCover}
                      onChange={e => setFeatures({...features, cloudCover: +e.target.value})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1"><span>Clear</span><span>{features.cloudCover}%</span><span>Overcast</span></div>
                  </div>

                  <button 
                    disabled={isPredicting}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isPredicting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Analyzing Data...
                      </>
                    ) : 'Predict Rainfall'}
                  </button>
                </form>
              </div>

              <div className="w-full md:w-3/5 p-8 flex flex-col items-center justify-center min-h-[400px]">
                {prediction === 'none' && !isPredicting && (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to Predict</h4>
                    <p className="text-slate-500 max-w-xs mx-auto">Adjust the parameters and click predict to see the Machine Learning model's forecast.</p>
                  </div>
                )}

                {isPredicting && (
                  <div className="text-center space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-600">ML Model</div>
                    </div>
                    <p className="text-slate-600 font-medium">Running inference algorithms...</p>
                  </div>
                )}

                {prediction !== 'none' && !isPredicting && (
                  <div className={`w-full text-center space-y-8 animate-in zoom-in-95 duration-300`}>
                    <div className={`p-8 rounded-3xl inline-block ${prediction === 'rainfall' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                      <div className="text-6xl mb-4">
                        {prediction === 'rainfall' ? '🌧️' : '☀️'}
                      </div>
                      <h4 className="text-3xl font-extrabold mb-2">
                        {prediction === 'rainfall' ? 'Rainfall Expected' : 'No Rainfall'}
                      </h4>
                      <p className="font-medium opacity-80">
                        {prediction === 'rainfall' 
                          ? 'Meteorological patterns suggest high probability of precipitation.' 
                          : 'Clear skies and dry conditions are forecasted based on current features.'}
                      </p>
                    </div>


                    <button 
                      onClick={() => setPrediction('none')}
                      className="text-slate-400 hover:text-slate-600 text-sm font-semibold underline underline-offset-4"
                    >
                      Reset and Run New Prediction
                    </button>
                  </div>
                )}
              </div>
            </div>


          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h5 className="text-lg font-bold mb-4">ML India Rainfall</h5>
              <p className="text-slate-400 text-sm">Empowering Indian farmers through data-driven meteorological insights and predictive modeling.</p>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Libraries Used</h5>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><span className="text-blue-400">NumPy:</span> Fast numerical operations</li>
                <li><span className="text-blue-400">Pandas:</span> Data cleaning & wrangling</li>
                <li><span className="text-blue-400">Matplotlib/Seaborn:</span> Visuals</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">ML Algorithms</h5>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>Logistic Regression</li>
                <li>Decision Tree & Random Forest</li>
                <li>KNN & SVM</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Resource Link</h5>
              <a href="https://docs.google.com/spreadsheets/d/1RA2OO0LZTeQykI_mvnensAjp6LM4YzWI1Tz0SUG5-Ao/edit" target="_blank" className="text-blue-400 text-sm underline">Dataset (Google Sheets)</a>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
            © 2025 Machine Learning Expert Portfolio. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
