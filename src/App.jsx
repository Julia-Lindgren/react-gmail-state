import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');

  const toggleRead = (targetEmailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === targetEmailId ? { ...email, read: !email.read } : email
      )
    );
  };

  const toggleStar = (targetEmailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === targetEmailId ? { ...email, starred: !email.starred } : email
      )
    );
  };
  
  const getReadEmails = (emails) => {
    return hideRead ? emails.filter((email) => !email.read) : emails;
  };

  const getStarredEmails = (emails) => {
    return emails.filter((email) => email.starred);
  };

  const filteredEmails = currentTab === 'starred' ? getStarredEmails(getReadEmails(emails)) : getReadEmails(emails);

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.filter((email) => !email.read).length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails(emails).length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
      <ul>
          {/* Mapping through the emails array and rendering each email */}
          {filteredEmails.map((email) => (
            <li
              key={email.id}
              className={`email ${email.read ? 'read' : 'unread'}`}
            >
              <div className="select">
                <input type="checkbox" className="select-checkbox"  checked={email.read} onChange={() => toggleRead(email.id)}/>
              </div>
              <div className="star">
                <input type="checkbox" className="star-checkbox" checked={email.starred} onChange={() => toggleStar(email.id)} />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
