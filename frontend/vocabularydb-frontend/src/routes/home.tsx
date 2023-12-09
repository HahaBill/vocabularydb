import * as React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';

function Home() {
    const userId = useSelector((state: RootState) => state.user.userId);
    const [listTasks, setListTasks] = React.useState([]);

    return (
        <div>
            <h1>
                USER ID: {userId}
            </h1>
            <p>
                lololololol
            </p>
        </div>
    )
}

export default Home;