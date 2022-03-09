import React from 'react'
import {Link} from "react-router-dom";

const Page404 = () => {
	return <div>
		<div>404 - Wrong way</div>
		<Link to={'/'}>Go back to Home</Link>
	</div>
}

export default Page404