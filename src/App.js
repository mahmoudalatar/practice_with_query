import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import { HomePage } from "./components/Home.page"
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page"
import { SuperHeroesPage } from "./components/SuperHeroes.page"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import HeroQuiz from "./components/HeroQuiz"
import RQHero from "./components/RQHero.page.js"
import DynamicParallelQueries from "./components/DynamicParallelQueries.page.js"
import PaginatedQueries from "./components/PaginatedQueries.js"
import RQInfinite from "./components/RQInfinite.js"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/hero-quiz">Hero Quiz</Link>
              </li>
              <li>
                <Link to="/dynamic-parallel-queries">
                  Dynamic Parallel Queries
                </Link>
              </li>
              <li>
                <Link to="/paginated-queries">Paginated Queries</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ Infinite</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route
              path="/dynamic-parallel-queries"
              element={<DynamicParallelQueries herosIds={[1, 3]} />}
            />
            <Route path="/paginated-queries" element={<PaginatedQueries />} />
            <Route path="/rq-infinite" element={<RQInfinite />} />
            <Route path="/hero-quiz" element={<HeroQuiz />} />
            <Route path="/hero/:heroId" element={<RQHero />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
