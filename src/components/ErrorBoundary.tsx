import React from "react"

interface ErrorBoundaryProps {
    children?: React.ReactNode
}

interface ErrorBoundaryState {
    error: Error | null
    errorInfo: React.ErrorInfo | null
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { error: null, errorInfo: null, hasError: false }
    }

    //Update state to show fallback UI
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { error, hasError: true }
    }

    //Log error details
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught:", error, errorInfo)
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    resetErrorBoundary() {
        this.setState({ hasError: false})
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div style={{ padding: "20px", backgroundColor: "#ffe6e6", color: "#900" }}>
                    <h2>Something went wrong!</h2>
                    <details>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                    <button onClick={this.resetErrorBoundary}>Try Again</button>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary