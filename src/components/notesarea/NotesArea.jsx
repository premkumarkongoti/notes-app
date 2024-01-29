import React, { useState, useEffect } from 'react';
import sendIcon from '../../assets/done.png';
import back from '../../assets/back.png';
import notesStyles from './NotesArea.module.css';
import bluesend from '../../assets/bluesend.png';

const NotesArea = (props) => {
  const [note, setNote] = useState('');
  const { groupSelect, groups, setGroups } = props;
  const [isTextEntered, setIsTextEntered] = useState(false);

  let notes = groupSelect.notes; // Define 'notes' variable here

  const getScreenSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setNote(value);
    setIsTextEntered(value.trim() !== '');
  };

  const handleSubmit = () => {
    setNote('');
    if (!note.trim()) return;
    const newGroup = [...groups];
    const currentGroup = newGroup[groupSelect.id];
    const time = `${new Date().toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`;
    const date = ` ${new Date().toLocaleDateString([], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;
    currentGroup.notes.push({ date, time, note });
    localStorage.setItem('groups', JSON.stringify(newGroup));
    setGroups(newGroup);
  };

  const keypress = (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
      setNote('');
    }
  };

  return (
    <>
    {screenSize.width < 800 ? (
      <div className={notesStyles.notescontainer}>
        <div className={notesStyles.noteshead}>
          <img
            src={back}
            alt={back}
            onClick={() => {
              window.location.reload();
            }}
          />
          <div className={notesStyles.notesgroup} style={{ background: groupSelect?.color }}>
            {typeof groupSelect?.groupName === 'string' && groupSelect.groupName.length > 0
              ? groupSelect.groupName
                  .split(' ')
                  .map((word) => word[0].toUpperCase())
                  .join('')
              : null}
          </div>
          <h2 className={notesStyles.groupname}>{groupSelect.groupName}</h2>
        </div>
        <div className={notesStyles.notesmobile}>
          {notes.map((note) => (
            <div className={notesStyles.dateandtextmobile}>
              <div className={notesStyles.dateandtime}>
                <p className={notesStyles.date}>
                  {note.date} - {note.time}
                </p>
              </div>
              <p className={notesStyles.textmobile}>{note.note}</p>
            </div>
          ))}
        </div>
        <div className={notesStyles.textareamobile}>
          <textarea
            className={notesStyles.textinputmobile}
            type="text"
            value={note}
            onChange={handleChange}
            placeholder="Enter your text here..."
            onKeyDown={keypress}
          ></textarea>
          <img
            src={sendIcon}
            className={notesStyles.sendimgmobile}
            alt="SendImg"
            onClick={handleSubmit}
          />
        </div>
      </div>
    ) : (
      <div className={notesStyles.notescontainer}>
        <div className={notesStyles.noteshead}>
          <img
            src={back}
            alt={back}
            onClick={() => {
              window.location.reload();
            }}
          />
          <div className={notesStyles.notesgroup} style={{ background: groupSelect?.color }}>
            {typeof groupSelect?.groupName === 'string' && groupSelect.groupName.length > 0
              ? groupSelect.groupName
                  .split(' ')
                  .map((word) => word[0].toUpperCase())
                  .join('')
              : null}
          </div>
          <h2 className={notesStyles.groupname}>{groupSelect.groupName}</h2>
        </div>
        <div className={notesStyles.notes}>
          {notes.map((note) => (
            <div className={notesStyles.dateandtext}>
              <div className={notesStyles.dateandtime}>
                <p className={notesStyles.date}>
                  {note.date} - {note.time}
                </p>
              </div>
              <p className={notesStyles.text}>{note.note}</p>
            </div>
          ))}
        </div>
        <div className={notesStyles.textarea}>
          <textarea
            className={notesStyles.textinput}
            type="text"
            value={note}
            onChange={handleChange}
            placeholder="Enter your text here..."
            onKeyDown={keypress}
          ></textarea>
          <img
            src={sendIcon}
            className={`${notesStyles.sendimg} ${isTextEntered ? notesStyles.blue : ''}`}
            alt="SendImg"
            onClick={handleSubmit}
          />
        </div>
      </div>
    )}
  </>
);
};

export default NotesArea;
