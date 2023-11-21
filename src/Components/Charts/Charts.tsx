import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { KanjiData2 } from '../../types';
import './Charts.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartsProps {
  labels: string[],
  title: string,
  variables: KanjiData2[][]
}

const Charts: React.FC<ChartsProps> = ({labels, title, variables}) => {

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: [variables[0].length, variables[1].length],
        backgroundColor: [
          'rgba(235, 177, 210, 0.771)',
          'rgba(156, 156, 172, 0.771)',
        ],
        borderColor: [
          'rgba(235, 177, 210, 1)',
          'rgba(156, 156, 172, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartKey = () => {
    return (
      <div className='key-container'>
        <div className='key-box'>
          <div className='key-set1'></div>
          <p className='key-label'>Kanji Studied</p>
        </div>
          <div className='key-box'>
            <div className='key-set2'></div>
            <p className='key-label'>Not studied yet</p>
        </div>
      </div>
    )
  }
  
  return (
        <div className='chart-container'>
          <p className='chart-header'>My Progress</p>
          <Doughnut data={data} />
        </div>
  )
}

export default Charts