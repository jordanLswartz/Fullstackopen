import { useState } from "react";

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else
    return (
      <table cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <StatisticLine text="good" value={props.good} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="neutral" value={props.neutral} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text="bad" value={props.bad} />
          </td>
        </tr>
        <td>
          <StatisticLine
            text="all"
            value={props.good + props.neutral + props.bad}
          />
        </td>
        <tr>
          <td>
            <StatisticLine
              text="average"
              value={(props.good + props.bad * -1) / props.good + props.bad}
            />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine
              text="positive"
              value={
                String(
                  (props.good / (props.good + props.neutral + props.bad)) * 100
                ) + "%"
              }
            />
          </td>
        </tr>
      </table>
    );
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value}
      </p>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
