import React from 'react'

const getViewBox = name => {
  switch (name) {
    case 'home':
      return '0 0 100.699 100.699'
    case 'search':
      return '-10 -9 64.699 64.699'
    case 'heart':
      return '0 0 100 100'
    case 'explore':
      return '0 -3 110 110'
    default:
      return '0 0 32 32'
  }
}

const getPath = (name, props) => {
  switch (name) {
    case 'home':
      return (
        <path
          {...props}
          d="M83.855,85.705H57.117V59.654H42.882v26.051H16.146V37.395l33.854-23.1l33.856,23.1V85.705L83.855,85.705z M62.099,80.725   h16.773V40.026L49.999,20.324L21.126,40.026v40.698h16.775V54.674h24.198V80.725L62.099,80.725z"
        />
      )
    case 'search':
      return (
        <path
          {...props}
          d="M30.3520505,27.5236234 L45.1923882,42.363961 L42.363961,45.1923882 L27.5236234,30.3520505 C24.6290381,32.6365928 20.9737395,34 17,34 C7.61115879,34 0,26.3888412 0,17 C0,7.61115879 7.61115879,0 17,0 C26.3888412,0 34,7.61115879 34,17 C34,20.9737395 32.6365928,24.6290381 30.3520505,27.5236234 L30.3520505,27.5236234 Z M17,30 C24.1797021,30 30,24.1797021 30,17 C30,9.8202979 24.1797021,4 17,4 C9.8202979,4 4,9.8202979 4,17 C4,24.1797021 9.8202979,30 17,30 Z"
        />
      )
    case 'heart':
      return (
        <path
          {...props}
          d="M50,82.417L21.526,51.642c-5.961-6.009-5.946-15.748,0.043-21.738c2.91-2.909,6.777-4.511,10.891-4.511  c4.114,0,7.982,1.602,10.891,4.511L50,36.551l6.648-6.648c2.909-2.909,6.776-4.511,10.891-4.511s7.981,1.602,10.891,4.511  c5.99,5.99,6.005,15.729,0.044,21.739L50,82.417z M32.46,31.392c-2.511,0-4.873,0.978-6.648,2.754  c-3.665,3.665-3.665,9.631,0,13.297l0.081,0.083L50,73.583l24.187-26.14c3.666-3.667,3.666-9.632,0.001-13.298  c-1.776-1.775-4.137-2.753-6.648-2.753s-4.872,0.978-6.648,2.754L50,45.037L39.109,34.146C37.333,32.37,34.972,31.392,32.46,31.392z  "
        />
      )
    case 'explore':
      return (
        <React.Fragment>
          <path
            {...props}
            d="M50.234,95C25.429,95,5.249,74.82,5.249,50.015S25.429,5.03,50.234,5.03s44.985,20.18,44.985,44.985S75.039,95,50.234,95z     M50.234,9.398c-22.396,0-40.617,18.221-40.617,40.617s18.221,40.617,40.617,40.617s40.617-18.221,40.617-40.617    S72.63,9.398,50.234,9.398z"
          />
          <path d="M30.041,69.644l11.323-27.365c0.22-0.531,0.642-0.952,1.174-1.169l27.417-11.196c0.298-0.122,0.594,0.176,0.471,0.473    L59.104,57.752c-0.22,0.531-0.642,0.952-1.174,1.169L30.512,70.117C30.215,70.238,29.918,69.941,30.041,69.644z M44.703,45.633    l-6.88,16.627c-0.028,0.068,0.04,0.137,0.108,0.109l16.66-6.803c0.532-0.217,0.955-0.638,1.174-1.169l6.88-16.627    c0.028-0.068-0.04-0.137-0.108-0.109l-16.66,6.803C45.345,44.682,44.923,45.103,44.703,45.633z" />
        </React.Fragment>
      )
    default:
      return <path />
  }
}

const Icon = ({
  name = '',
  style = {},
  fill = '#000',
  viewBox = '',
  width = '100%',
  className = '',
  height = '100%',
}) => (
  <svg
    fill={fill}
    width={width}
    style={style}
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {getPath(name, { fill })}
  </svg>
)

export default Icon
