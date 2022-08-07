import { Component } from "react";
import ErrorComponent from "./ErrorComponent";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
