import "./App.css";
import { useState } from "react";
import data from "./data";
import ReactPaginate from "react-paginate";
import Header from "./Header";

function App() {
  //state that will hold the page number. initial value of page is 0
  const [page, setPage] = useState(0);

  //import the data from the data.js file and store it in a state.
  const [employees] = useState(data);

  //number of records to be displayed per page should be fixed.
  const employeesPerPage = 3;

  //track the number of pages visited by the user.
  const numberOfEmployeesVistited = page * employeesPerPage;

  //employees is being sliced using numberOfEmployeesVisited. 
  //When the user clicks on the 3rd button, the value of numberOfEmployeesVisited is 6. 
  //So numberOfEmployeesVisited added to employeesPerPage is 9 (6 + 3).
  const displayEmployees = employees
    .slice(
      numberOfEmployeesVistited,
      numberOfEmployeesVistited + employeesPerPage // 6+3
    ) //mapped into the displayEmployees. This will be used to render the records on the UI. 
    .map((temp) => {
      return (
        <>
        <br/>
        <div className="card">
        <h4>No.: {temp.no}</h4>
          <h4>Name: {temp.name}</h4>
          <h4>Department: {temp.department}</h4>
          <h4>City: {temp.city}</h4>
        </div>
        </>
      );
    });


                                                // APPLYING PAGINATION NOW //                 

  //The value of pageCount should be equal to the total number of records
  const totalPages = Math.ceil(employees.length / employeesPerPage);
  
  //onPageChange. Its value should be a function and this function will decide what happens
  // when the user navigates from one page to another. 
  
  //The value of selected is equal to the page the user wants to navigate to. 
  //(If the user clicked on 3, 
  //the values of selected will be 2 because the counting starts from 0). 

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="App">
      {/* // to display the data on web page!! */}
      <Header/>
      {displayEmployees} 

      <ReactPaginate
      // important props define the functionaity of pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={changePage}
        
        // the remaining props define the CSS properties 
        containerClassName={"navigationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"navigationDisabled"}
        activeClassName={"navigationActive"}
      />
      ;
    </div>
  );
}

export default App;
