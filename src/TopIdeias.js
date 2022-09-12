function TopIdeias(props){


    return(
        <div className="ideias-top-10">
            <span className="conteudo">{props.info.conteudo}</span>
            <span className="media">{props.info.media.toFixed(2)}</span>
        </div>
    )
}
export default TopIdeias;