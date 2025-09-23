import './App.css'
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom'
import { pageTransition } from './animation/routes';
import HomePage from "./pages/Home"
import LoadingPage from './pages/Loading';
import QuestionsPage from './pages/Questions';

const App = () => {
  const location = useLocation();

  return (
    <div className='app'>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/loading"
            element={
              <motion.div {...pageTransition}>
                <LoadingPage />
              </motion.div>
            }
          />
          <Route
            path="/questions"
            element={
              <motion.div {...pageTransition}>
                <QuestionsPage />
              </motion.div>
            }
          />
      </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
