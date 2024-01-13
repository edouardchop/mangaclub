export default function GoldButton ( { text, url } )
{
    const redirection = () =>
    {
        Router.push(url)
    }
    
    return (
        <button Onclick={ redirection } style={{ backgroundColor: '#D7C412', color: 'black' }}>
            { text }
        </button>
    )

}