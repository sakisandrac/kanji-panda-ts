import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js';
import { KanjiData2 } from '../../types';
import './Charts.css';

Chart.register(ArcElement);

interface ChartsProps {
  labels: string[],
  title: string,
  variables: KanjiData2[][]
}

const Charts: React.FC<ChartsProps> = ({labels, title, variables}) => {
//labels [studied, not studied yet]
//title = 'Kanji Studied'
//var1 = studied var2= not studied
//var1 = correct var2= incorrect
console.log(variables)
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: [variables[0].length, variables[1].length],
        backgroundColor: [
          // 'rgba(50, 38, 67, 0.771)',
          'rgba(235, 177, 210, 0.771)',
          // 'rgba(250, 139, 202, 0.771)',
          'rgba(156, 156, 172, 0.771)',
          // 'rgba(153, 148, 172, 0.771)',
        ],
        borderColor: [
          // 'rgba(50, 38, 67, 1)',
          'rgba(235, 177, 210, 1)',
          // 'rgba(250, 139, 202, 1)',
          'rgba(156, 156, 172, 1)',
          // 'rgba(153, 148, 172, 1)',
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
    // <div className='main-container'>
      // <div className='dashboard'>
        <div className='chart-container'>
          <p className='chart-header'>My Progress</p>
          <Doughnut data={data} />
          {chartKey()}
        </div>
      // </div>
    // </div>
  )
}

export default Charts