import React, { useState, useEffect, useRef } from 'react';
import modalStyles from './Modal.module.css';

const Modal = (props) => {
  const [formData, setFormData] = useState({ groupName: ' ', color: ' ' }); 
  const { setGroups, groups, closeModal } = props;
  const modalRef = useRef(null);
  
  const colorOptions = ['#B38BFA','#FF79F2','#43E6FC','#F19576','#0047FF', '#6691FF'];

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.groupName);
  };

  const handleChangeColor = (color) => {
    setFormData({ ...formData, color });
    console.log(formData.color);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   if(!formData.groupName.trim() || !formData.color.trim()){
     alert('please select group name and color')
    return;
 }

    if (formData.color === '') {
      alert('Please select a color');
      return;
    }

    const filteredGroups = groups.filter(group => group.groupName.trim() !== '' && group.color.trim() !== '');

    const newGroup = [
      ...groups,
      {
        groupName: formData.groupName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
   // setGroups(newGroup);
    //localStorage.setItem('groups', JSON.stringify(newGroup));
    //closeModal(false);

   // const updatedGroups = groups.filter(group => group.groupName.trim() !== '' && group.color.trim() !== '');
      const updatedGroups = [...filteredGroups, newGroup]
    updatedGroups.push(newGroup);
    setGroups(updatedGroups);

    localStorage.setItem('groups', JSON.stringify(updatedGroups));

    closeModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  return (
    <>
    {screenSize.width < 800 ? (
      <div className={modalStyles.modalmobile}>
        <div className={modalStyles.modalcontainermobile} ref={modalRef}>
          <h2 className={modalStyles.modalheadmobile}>Create New Group</h2>
          <label className={modalStyles.modalgroupmobile}>Group Name</label>
          <input
            type="text"
            className={modalStyles.modaltextmobile}
            name="groupName"
            placeholder="Enter your group name"
            onChange={handleChange}
          />
          <br />
          <label className={modalStyles.modalcolormobile}>Choose Colour</label>
          
            {colorOptions.map((color, index) => (
              <button
                className={`${modalStyles.colorbuttonmobile} ${
                  formData.color === color ? modalStyles.selected : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                        height: '20px',
                        width: '20px',
                        background: color,
                        borderRadius: '25px',
                        border: 'none',
                        marginRight: '5px',
                }}
                onClick={() => handleChangeColor(color)}
              ></button>
            ))}
          
          <button
            className={modalStyles.createbtnmobile}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    ) : (
      <div className={modalStyles.modal}>
        <div className={modalStyles.modalcontainer} ref={modalRef}>
          <h2 className={modalStyles.modalhead}>Create New Group</h2>
          <label className={modalStyles.modalgroup}>Group Name</label>
          <input
            type="text"
            className={modalStyles.modaltext}
            name="groupName"
            placeholder="Enter your group name"
            onChange={handleChange}
          />
          <label className={modalStyles.modalcolor}>Choose Colour</label>
          
            {colorOptions.map((color, index) => (
              <button
                className={`${modalStyles.colorbutton} ${
                  formData.color === color ? modalStyles.selected : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                       height: '40px',
                       width: '40px',
                       background: color,
                       borderRadius: '25px',
                       border: 'none',
                       marginRight: '10px',
                }}
               
                onClick={() => handleChangeColor(color)}
              ></button>
            ))}
          
          <button
            className={modalStyles.createbtn}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    )}
  </>
);
};

export default Modal;