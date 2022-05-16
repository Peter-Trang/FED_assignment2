import "./Job.css";
import { useState, useEffect, useCallback } from "react";
import { MdLocationOn } from "react-icons/md";
import { IoTrashSharp, IoClose, IoClipboard } from "react-icons/io5";

const Job = (props) => {
  const [showModelsToAdd, setShowModelsToAdd] = useState(false);
  const [showExpensesToAdd, setShowExpensesToAdd] = useState(false);
  const [addedModels, setAddedModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedText, setSelectedText] = useState();
  const [selectedAmount, setSelectedAmount] = useState();
  const [options, setOptions] = useState([]);
  const [modelAdded, setModelAdded] = useState(false);

  const getModelsAddedToJob = useCallback(async () => {
    let url = `https://localhost:7181/api/Jobs/${props.jobId}`;
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        let models = await response.json();
        setAddedModels(models.models);
      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }
    return;
  }, [props.jobId]);

  useEffect(() => {
    getModelsAddedToJob();
  }, [getModelsAddedToJob]);
  
  const getModels = useCallback(async () => {
    let url = "https://localhost:7181/api/Models";
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        let options = await response.json();
        setOptions(options);
        setSelectedModel(options[0].efModelId);
      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }
    return options;
  }, []);


  useEffect(() => {
    getModels();
  }, [getModels]);

  useEffect(() => {
    getModelsAddedToJob();
    getModels();
    setModelAdded(false);
  }, [modelAdded]);

  const displayModelsAddedToJob = addedModels.map((model) => {
    return (
      <li className="model-name" key={model.email}>
        {model.firstName}{" "}
        <IoTrashSharp
          className="delete-model-button"
          key={model.email}
          onClick={() => removeModelHandler(model.email)}
        />
      </li>
    );
  });

  async function removeModelHandler(modelemail) {
    console.log(modelemail);
    let allModels;
    let model;

    let urlGet = `https://localhost:7181/api/Models`;
    try {
      let response = await fetch(urlGet, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        allModels = await response.json();
        console.log(allModels);
        model = allModels.find((option) => option.email === modelemail);
        console.log(model);
        setModelAdded(true)
      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }

    var url = `https://localhost:7181/api/Jobs/${props.jobId}/model/${model.efModelId}`;
    await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((responseJson) => {})
      .catch((error) => alert("Something bad happened: " + error));
  }

  const showModels = () => {
    setShowModelsToAdd(!showModelsToAdd);

    // getModels();
  };

  const showExpenses = () => {
    setShowExpensesToAdd(!showExpensesToAdd);
  };

  const selectedModelHandler = (event) => {
    setSelectedModel(event.target.value);
  };
  const selectedDateHandler = (event) => {
    setSelectedDate(event.target.value);
  };
  const selectedTextHandler = (event) => {
    setSelectedText(event.target.value);
  };
  const selectedAmountHandler = (event) => {
    setSelectedAmount(event.target.value);
  };

  const submitModelHandler = (event) => {
    event.preventDefault();
    var url = `https://localhost:7181/api/Jobs/${props.jobId}/model/${selectedModel}`;

    fetch(url, {
      method: "POST", // Or PUT
      // body: JSON.stringify(this.form), // assumes your data is in a
      // form object on your instance.
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setModelAdded(true);
        }
        // this.response = responseJson;
      })
      .catch((error) => alert("Something bad happened: " + error));

    // getModelsAddedToJob();
  };

  const submitExpenseHandler = (event) => {
    event.preventDefault();
    var url = `https://localhost:7181/api/Expenses`;

    const expenseData = {
      modelId: props.modelId,
      jobId: props.jobId,
      date: selectedDate,
      text: selectedText,
      amount: selectedAmount,
    };

    console.log(expenseData);

    fetch(url, {
      method: "POST", // Or PUT
      body: JSON.stringify(expenseData), // assumes your data is in form object on your instance.
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((responseJson) => {
        // this.response = responseJson;
      })
      .catch((error) => alert("Something bad happened: " + error));

    setSelectedDate("");
    setSelectedText("");
    setSelectedAmount("");
  };

  let toggleAddModelOption = null;

  if (showModelsToAdd) {
    toggleAddModelOption = (
      <div>
        <IoClose />
      </div>
    );
  } else {
    toggleAddModelOption = (
      <h6>
        Add model to the job <IoClipboard />
      </h6>
    );
  }

  let toggleAddModelExpense = null;

  if (showModelsToAdd) {
    toggleAddModelExpense = (
      <div>
        <IoClose />
      </div>
    );
  } else {
    toggleAddModelExpense = (
      <h6>
        Add expense to the job <IoClipboard />
      </h6>
    );
  }

  // useEffect(() => {
  //   getModels()
  // }, [getModels])

  return (
    <div className="job">
      <p className="job-title">
        {props.customer}
        {props.modelId == -1 && (
          <IoTrashSharp
            className="trash-icon"
            onClick={() => props.onRemoveJob(props.jobId)}
          />
        )}
      </p>
      <hr />
      <p>
        {" "}
        <MdLocationOn />
        {props.location}
      </p>
      <hr />
      {props.modelId == -1 && (
        <div>
          <ul className="list-of-model-names">{displayModelsAddedToJob}</ul>
          <div className="expand-button" onClick={showModels}>
            {toggleAddModelOption}
          </div>
        </div>
      )}
      {props.modelId != -1 && (
        <div>
          <div className="expand-button" onClick={showExpenses}>
            {toggleAddModelExpense}
          </div>
        </div>
      )}

      {showExpensesToAdd && (
        <form
          onSubmit={submitExpenseHandler}
          className="add-model-form-wrapper"
        >
          <div className="add-expense-form">
            <label className="expense-labels">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={selectedDateHandler}
            />
            <label className="expense-labels">text</label>
            <input
              type="text"
              value={selectedText}
              onChange={selectedTextHandler}
            />
            <label className="expense-labels">amount</label>
          </div>
          <input
            type="number"
            value={selectedAmount}
            onChange={selectedAmountHandler}
          />
          <button type="submit" className="button add-model-button">
            Add Expense
          </button>
        </form>
      )}

      {showModelsToAdd && (
        <form onSubmit={submitModelHandler} className="add-model-form-wrapper">
          <select value={selectedModel} onChange={selectedModelHandler}>
            {options.map((option) => (
              <option value={option.efModelId} key={option.efModelId}>
                {option.firstName}
              </option>
            ))}
          </select>{" "}
          <button type="submit" className="button add-model-button">
            Add Model
          </button>
        </form>
      )}
    </div>
  );
};

export default Job;
