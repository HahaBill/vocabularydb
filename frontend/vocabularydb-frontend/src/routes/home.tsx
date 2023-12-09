import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';

function Home() {
    const userId = useSelector((state: RootState) => state.user.userId);
    const [listTasks, setListTasks] = React.useState([]);

    return (
        <div>
            <h1>
                {userId}
            </h1>
        </div>
    )
}

export default Home;