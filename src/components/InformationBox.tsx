import "./InformationBox.css";

// icon vai ser "exclamation" para erro e "check" para sucesso

interface InformationBoxProps {
    text: string;
    closeBox: () => void;
    icon: string;
    color: string;
}

const InformationBox = ({ text, closeBox, icon, color } : InformationBoxProps) => {
    return (
        <div className="container-box">
            <div className="box">
                <h2 className="text" style={{ color: `${color}` }}>
                    {text}
                </h2>
                <i
                    className={`bi bi-${icon}-circle-fill box-icon`}
                    style={{ color: `${color}` }}
                ></i>
                <button
                    className="button"
                    type="button"
                    onClick={closeBox}
                    style={{ backgroundColor: `${color}` }}
                >
                    Ok
                </button>
            </div>
        </div>
    );
};

export default InformationBox;