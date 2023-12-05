
import ToggleAuthenticationForm from '../../components/Authentication/ToggleAuthenticationForm'
import VocabularyDBImage from '../../assets/landscape_dalle.png'
import VocabularyDBIcon from '../../assets/vocabularydb_icon.png'

function AuthPage() {

    return (
        <div className='absolute left-0 top-0 h-full w-full flex items-center justify-center'>
            <div className='relative h-full w-full bg-sky-500'>
                <img className='h-full' src={VocabularyDBImage} alt='Image'/>
            </div>
            <div className='relative bg-gradient-to-r from-orange-200 to-emerald-500 h-full w-full flex flex-col justify-center items-center'>
                <div className='absolute top-20'>
                    <img className='h-36 w-36' src={VocabularyDBIcon} alt='Image'/>
                </div>
                <div className='absolute'>
                    <ToggleAuthenticationForm/>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;