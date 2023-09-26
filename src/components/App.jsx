import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions ';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countFeedback = event => {
    const currentBtn = event.target.name;
    if (currentBtn === 'good') {
      setGood(prevGood => prevGood + 1);
    } else if (currentBtn === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    } else if (currentBtn === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const totalValue = countTotalFeedback();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={countFeedback}
        />
      </Section>
      <Section title="Statistics">
        {totalValue ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalValue}
            positivePercentage={((100 * good) / (good + neutral + bad)).toFixed(
              0
            )}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
}
