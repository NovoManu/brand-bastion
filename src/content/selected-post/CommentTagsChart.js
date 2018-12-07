import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2'

class CommentTagsChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      options: {
        legend: {
          display: false
        },
        title: {
          display: false
        },
        tooltips: {
          enabled: true,
          mode: 'label',
          intersect: false,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          titleFontColor: 'rgba(0, 0, 0, 1)',
          footerFontColor: 'rgba(0, 0, 0, 1)',
          bodyFontColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          displayColors: false
        }
      }
    }
  }
  initChart = () => {
    const {mostPopularTags} = this.props
    if (!mostPopularTags.length) return null
    const chartData = {
      datasets: [{
        backgroundColor: [
          'rgba(94,116,255,0.8)',
          'rgba(0,66,32,0.8)',
          'rgb(196,27,27,0.8)'
        ],
        data: mostPopularTags.map(tag => tag.count)
      }],
      labels: mostPopularTags.map(tag => tag.key)
    }
    return <Pie data={chartData} options={this.state.options}/>
  }
  render () {
    return (
      this.initChart()
    )
  }
}

export default CommentTagsChart
