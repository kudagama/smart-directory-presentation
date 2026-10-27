import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, TrendingUp, Trophy, Star, ChevronRight, Award } from 'lucide-react';

const PERFORMANCE_DATA = [
  { id: 1, name: "Kamal Perera", score: 98, role: "Senior Agent", avatar: "https://i.pravatar.cc/150?u=kamal" },
  { id: 2, name: "Nimali Fernando", score: 95, role: "Support Specialist", avatar: "https://i.pravatar.cc/150?u=nimali" },
  { id: 3, name: "Saman Kumara", score: 91, role: "Junior Agent", avatar: "https://i.pravatar.cc/150?u=saman" },
];

export default function PerformanceApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-corpBlue flex items-center justify-center p-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-corpCyan/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card w-full max-w-md p-8 relative z-10 border-t-4 border-t-corpCyan"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-corpCyan/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-corpCyan/30">
                <Lock className="w-8 h-8 text-corpCyan" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Manager Access</h2>
              <p className="text-gray-400">Login to view agent performance metrics</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-corpCyan/50 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-corpCyan/50 transition-colors"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-corpCyan to-blue-500 text-corpBlue font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Access Dashboard <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl h-[80vh] flex flex-col relative z-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 flex items-center gap-3">
                  <TrendingUp className="w-10 h-10 text-corpCyan" />
                  Agent <span className="text-gradient">Performance</span>
                </h1>
                <p className="text-gray-400 text-lg">Top ranked support agents this week</p>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 transition-colors"
              >
                Logout
              </button>
            </div>

            <div className="grid gap-6 flex-1">
              {PERFORMANCE_DATA.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`glass-card p-6 flex items-center gap-6 relative overflow-hidden group ${
                    index === 0 ? 'border-l-4 border-l-yellow-400' :
                    index === 1 ? 'border-l-4 border-l-gray-300' :
                    'border-l-4 border-l-orange-500'
                  }`}
                >
                  {/* Background Rank Number */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.03] group-hover:text-white/[0.05] transition-colors group-hover:scale-110 duration-500">
                    #{index + 1}
                  </div>

                  <div className="relative">
                    <img src={agent.avatar} alt={agent.name} className="w-20 h-20 rounded-full border-2 border-white/10" />
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-800' :
                      'bg-orange-500 text-orange-950'
                    }`}>
                      {index === 0 ? <Trophy className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className="flex-1 z-10">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      {agent.name}
                      {index === 0 && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                    </h3>
                    <p className="text-corpCyan font-medium">{agent.role}</p>
                  </div>

                  <div className="text-right z-10">
                    <div className="text-4xl font-extrabold text-white">
                      {agent.score}<span className="text-xl text-gray-500">/100</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Performance Score</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
