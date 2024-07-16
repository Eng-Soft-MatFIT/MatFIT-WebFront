import img from '../assets/img-not-found.jpg'
import "./NotFound.css"

interface NotFoundProps {
    title : string;
}

function NotFound( {title} : NotFoundProps) {
  return (
    <div className='not-found'>
        <h2>{title}</h2>
        <img src={img} alt="nao-encontrado" width={300} height={300}/>
    </div>
  )
}

export default NotFound