import './header.css';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header-content'>
        <div className='branding'>
          <h1>Custom Commands</h1>
          <p>
            built with <span className='rozenite'>Rozenite</span> ❤️
          </p>
        </div>
      </div>
    </header>
  );
};
