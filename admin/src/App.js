import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'component/Loadable'
import NavWrapper from 'component/NavWrapper'



class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/login' component={Loadable({ loader: () => import('./app/login') })}   />
					<Route path='/' render={() => (
						<div className='app-root'>
							<NavWrapper>
								<Switch>
									<Route exact path='/' component={Loadable({ loader: () => import('./app/case')})}  />
                  <Route exact path='/home' component={Loadable({ loader: () => import('./app/home')})}  />
                  <Route exact path='/good' component={Loadable({ loader: () => import('./app/good')})}  />
                  
                </Switch>
							</NavWrapper>
						</div>
					)}/>
				</Switch>
			</Router>
		)
	}
}

export default App
