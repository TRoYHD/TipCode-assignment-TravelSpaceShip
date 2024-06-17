// Import necessary libraries and components
import React, { Component } from 'react';

// Define the ErrorBoundary component
class ErrorBoundary extends Component {
  // Constructor to initialize state
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // State to track if an error has occurred
  }

  // Method to update state when an error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to indicate an error has occurred
  }

  // Method to log error details
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo); // Log error details to console
  }

  // Render method to display fallback UI if an error has occurred
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // Display fallback UI
    }
    return this.props.children; // Render children components if no error has occurred
  }
}

// Export the ErrorBoundary component
export default ErrorBoundary;
