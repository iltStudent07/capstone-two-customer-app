import React from "react"

interface ErrorBoundaryProps {
    children?: React.ReactNode
}

interface ErrorBoundaryState {
    error: Error | null
    errorInfo: React.ErrorInfo | null
    hasError: boolean
}

const initialState: ErrorBoundaryState = {
    error: null,
    errorInfo: null,
    hasError: false,
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = initialState
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

    resetErrorBoundary = () => {
        this.setState(initialState)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "20px", backgroundColor: "#ffe6e6", color: "#900" }}>
                    <h2>Something went wrong!</h2>
                    <details>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo?.componentStack}
                    </details>
                    <button onClick={this.resetErrorBoundary}>Try Again</button>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary