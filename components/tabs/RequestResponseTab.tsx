import React, { useState } from 'react';
import { HttpMethod } from '../../types';
import { Button } from '../ui/Button';
import { ArrowRight, Globe } from 'lucide-react';

export const RequestResponseTab: React.FC = () => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSend = () => {
    setLoading(true);
    setResponse(null);
    
    // Simulate Network Delay
    setTimeout(() => {
      setLoading(false);
      
      const success = Math.random() > 0.2; // 80% success rate for educational purposes

      if (!success) {
         setResponse({
          status: 500,
          statusText: 'Internal Server Error',
          body: { error: 'Something went wrong' }
        });
        return;
      }

      if (method === 'GET') {
        setResponse({
          status: 200,
          statusText: 'OK',
          body: { page: 'index.html', title: 'Welcome' }
        });
      } else if (method === 'POST') {
        setResponse({
          status: 201,
          statusText: 'Created',
          body: { id: 101, message: 'Data saved successfully' }
        });
      } else if (method === 'DELETE') {
        setResponse({
          status: 204,
          statusText: 'No Content',
          body: null
        });
      }
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Request Builder */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-full">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5" /> Client Request
        </h3>

        <div className="space-y-4 flex-grow">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">HTTP Method</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="GET">GET (Retrieve Data)</option>
              <option value="POST">POST (Send Data)</option>
              <option value="DELETE">DELETE (Remove Data)</option>
            </select>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-700">
            <div className="text-cyan-400">{method} <span className="text-slate-200">/api/v1/users</span> HTTP/1.1</div>
            <div className="text-slate-400">Host: example.com</div>
            <div className="text-slate-400">User-Agent: SecurePath-Browser/1.0</div>
            {method === 'POST' && (
              <>
                <div className="text-slate-400">Content-Type: application/json</div>
                <div className="text-yellow-500 mt-2">
                  {`{
  "user": "ashish",
  "role": "developer"
}`}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleSend} disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Request'}
          </Button>
        </div>
      </div>

      {/* Response Viewer */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-full relative overflow-hidden">
        <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" /> Server Response
        </h3>

        {loading && (
          <div className="absolute inset-0 bg-slate-800/80 flex items-center justify-center z-10 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!response && !loading && (
          <div className="flex-grow flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
            Waiting for request...
          </div>
        )}

        {response && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-4 rounded-lg border-l-4 ${response.status >= 400 ? 'bg-rose-900/20 border-rose-500' : 'bg-emerald-900/20 border-emerald-500'}`}>
              <div className="text-3xl font-bold mb-1">
                <span className={response.status >= 400 ? 'text-rose-400' : 'text-emerald-400'}>{response.status}</span>
                <span className="text-slate-300 text-lg ml-2">{response.statusText}</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-700 overflow-auto">
              <div className="text-slate-400">HTTP/1.1 {response.status} {response.statusText}</div>
              <div className="text-slate-400">Date: {new Date().toUTCString()}</div>
              <div className="text-slate-400">Server: SecurePath-Server</div>
              {response.body && (
                <div className="text-emerald-300 mt-4">
                  {JSON.stringify(response.body, null, 2)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
