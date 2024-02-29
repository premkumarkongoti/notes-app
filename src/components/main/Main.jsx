import React, { useState, useEffect, useRef } from 'react';
import Modal from '../modal/Modal';
import Notes from '../notesarea/NotesArea';
import bgImage from '../../assets/bgimage.png';
import lock from '../../assets/lock.png';
import mainStyles from './Main.module.css';
import plusIcon from '../../assets/plus.png';

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);
  const modalRef = useRef(null);




  const getScreenSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const storedGroups = localStorage.getItem('groups');
      if (storedGroups) {
        const parsedGroups = JSON.parse(storedGroups);
        setGroups(parsedGroups);
      }
    };
    fetchGroups();
  }, []);

  
  const handleClickGroup = (group) => setGroupSelect(group);

  const handleCloseModal = () => setOpenModal(false);

  {/*const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  };*/}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openModal]);

  

  return (
    <>
      {screenSize.width < 800 ? (
        <div className={`${mainStyles.sidebarmobile} ${groups.length > 4 ? mainStyles.scrollable : ''}`}>
          {groupSelect ? (
            <Notes groupSelect={groupSelect} groups={groups} setGroups={setGroups} />
          ) : (
            <>
              <h1 className={mainStyles.headmobile}>Pocket Notes</h1>
              <div className={mainStyles.plusmobile} onClick={() => setOpenModal(true)}>
                <img src={plusIcon} alt="plus" />
              </div>
              <div className={mainStyles.grouplist}>
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`${mainStyles.groupitem} ${groupSelect === group ? mainStyles.selected : ''}`}
                    onClick={() => handleClickGroup(group)}
                  >
                    <div className={mainStyles.groupicon} style={{ background: group.color }}>
                    {group.groupName
                          ? group.groupName
                             .split(' ')
                             .map((word) => word[0]?.toUpperCase())
                             .join('')
                          : null}
                    </div>
                    <h2 className={mainStyles.groupname}>{group.groupName}</h2>
                  </div>
                ))}
              </div>
            </>
          )}

          {openModal && (
            <Modal closeModal={handleCloseModal} setGroups={setGroups} groups={groups} />
          )}
        </div>
      ) : (
        <>
        <div className={`${mainStyles.sidebar} ${groups.length > 4 ? mainStyles.scrollable : ''}`}>
          <div className={mainStyles.head1}> <h1 className={mainStyles.head}>Pocket Notes</h1></div>
            <div className={mainStyles.plus} onClick={() => setOpenModal(true)}>
              <img src={plusIcon} alt="plus" />
            </div>
            <div className={mainStyles.grouplist}>
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`${mainStyles.groupitem} ${groupSelect === group ? mainStyles.selected : ''}  ${groups.length > 4 ? mainStyles.scrollable : ''}`}
                  onClick={() => handleClickGroup(group)}
                >
                  <div className={mainStyles.groupicon} style={{ background: group.color }}>
                  {group.groupName
                          ? group.groupName
                             .split(' ')
                             .map((word) => word[0]?.toUpperCase())
                             .join('')
                          : null}
                  </div>
                  <h2 className={mainStyles.groupname}>{group.groupName}</h2>
                </div>
              ))}
            </div>
          </div>
          {openModal && (
            <Modal closeModal={handleCloseModal} modalRef={modalRef} setGroups={setGroups} groups={groups} />
          )}
          <div className={mainStyles.messagearea}>
            {groupSelect ? (
              <Notes groupSelect={groupSelect} groups={groups} setGroups={setGroups} />
            ) : (
              <>
                <div className={mainStyles.messagetext}>
                  <img src={bgImage} alt="banner" />
                  <h2 className={mainStyles.messageheading}>PocketNotes</h2>
                  <p className={mainStyles.messagedescription}>
                    Send and receive messages without keeping your phone online.
                    <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                  </p>
                </div>
                <footer className={mainStyles.messagefooter}>
                  <img src={lock} alt="lock" />
                  end-to-end encrypted
                </footer>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Main;
