import CustomerList from '../components/CustomerList'
function Customers() {
    return (
        <div>
           <h1>Customers:</h1>
            <CustomerList id={0} /> 
        </div>  
    )
}

export default Customers