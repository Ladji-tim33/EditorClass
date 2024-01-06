

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    extractTextFromHTML  (html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
      };

    handleChange(e) {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }

    handleClick() {
   
    const { text } = this.state;

    // Création d'un blob avec le texte
    const blob = new Blob([text], { type: 'text/plain' });

    // Création d'une URL à partir du blob
    const url = URL.createObjectURL(blob);

    // Création d'un élément 'a' pour le téléchargement
    const link = document.createElement('a');
    link.href = url;
    link.download = 'texte.txt'; // Nom du fichier à télécharger
    document.body.appendChild(link);

    // Clic simulé sur le lien pour démarrer le téléchargement
    link.click();

    // Suppression de l'élément 'a' après le téléchargement
    document.body.removeChild(link);
    }
    
    render() {
        return  <div className='container-fluid mt-5'>
           <h4 className='text-center text-white'>Markdown Editor</h4>
      <h5 className='text-center text-secondary'>You can type in html tags as well</h5>
  
        <div className='row'>
          <form className="col-md-8">
            <Myform name="text" value={this.state.text} onChange={this.handleChange}></Myform>
          </form>
          <form className="col-md-4">
            <MyResult name="text" value={this.extractTextFromHTML(this.state.text)}></MyResult>
          </form>
        </div>
  
        <ButtonDowlond className="btn btn-primary text-white fs-4" onClick={this.handleClick}>Download text</ButtonDowlond>
      </div>

    }
}

const Myform = ({ type, name, onChange, value }) => {
    return (
      <div className="form-group"                                                   >
        <label htmlFor={name}></label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          placeholder='Enter text...'
          className="form-control bg-secondary text-white heut"
        />
      </div>
    );
  }

  const MyResult = ({  value }) => {

    return (
      <div className="form-group">
        <textarea
          value={value}
          readOnly // Empêche la modification du champ de texte
          className="form-control heute mt-4"
        />
      </div>
    );
  }

  const ButtonDowlond = ({ className, onClick, children }) => {
    return (
      <div className="mt-4 text-center mb-4">
        <button className={className} onClick={onClick}>{children}</button>
      </div>
    );
  }

ReactDOM.render(<Home />, document.querySelector('#app'))