import { Provider } from "react-redux"
import { store } from "./redux/store/store"
import AppRouter from "./routers/AppRouter"
import "./assets/styles/styles.scss";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
