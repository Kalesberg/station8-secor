import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../../../../../context/context'

import styles from './info.module.scss'

export default ({ user }) => {
  const context = useContext(Context)

  const handleSetUpdate = () => ({
    Company: user.company,
    'Address Line 1': user.address1,
    'Address Line 2': user.address2,
    City: user.city,
    State: user.state,
    ZIP: user.zipCode,
    'First Name': user.firstName,
    'Last Name': user.lastName,
    'Phone Number': user.phone.replace(/[^0-9]/g, ''),
    Email: user.email,
    Password: '',
    passwordConfirm: ''
  })

  const [editing, setEditing] = useState('')
  const [update, setUpdate] = useState(handleSetUpdate())

  const handleCancelEdit = () => {
    setEditing('')
    setUpdate(handleSetUpdate())
  }
  const handleBeginEdit = e => { setEditing(e.target.title) }

  const handleMakeUpdate = e => setUpdate({ ...update, [e.target.id]: e.target.value })
  const handleMakePhoneUpdate = e => setUpdate({ ...update, [e.target.id]: e.target.value.replace(/[^0-9]/g, '') })

  const handleSave = async e => {
    e.preventDefault()
    console.log(editing, update)
    if (editing === 'password' && update.Password !== update.passwordConfirm) {
      console.log('passwords do not match')
    }
    const res = await window.fetch('/.netlify/functions/edituserdetails', {
      method: 'PATCH',
      body: JSON.stringify({
        editing,
        ...update
      })
    })
    const data = await res.json()
    console.log(data)
    context.handleValidateUser()
  }

  useEffect(() => {
    console.log('user', user)
  }, [user])

  return (
    <div className={styles.info}>
      <div className={styles.column}>
        <h2 className={styles.sectionTitle}>Company</h2>
        <div className={styles.fields}>
          <div className={styles.field + `${editing === '' ? '' : editing === 'company' ? ` ${styles.editing}` : ` ${styles.hide}`}`}>
            <div className={styles.icon + ` ${styles.company}`} />
            <p className={styles.value}>{user.company}</p>
            <div className={styles.inputs}>
              <div className={styles.inputField}>
                <label htmlFor='Company'>Company name<span className={styles.required}>*</span></label>
                <input id='Company' className={styles.input} value={update.Company} onChange={handleMakeUpdate} required />
              </div>
            </div>
            <div className={styles.buttons}>
              <p className={styles.edit} onClick={handleBeginEdit} title='company'>Edit</p>
              <p className={styles.save + `${!update.Company.trim() || update.Company.trim() === user.company ? ` ${styles.error}` : ''}`} onClick={handleSave}>{!update.Company.trim() ? 'Company is required' : update.Company.trim() === user.company ? 'No changes to save' : 'Save'}</p>
              <p className={styles.cancel} onClick={handleCancelEdit}>Cancel</p>
            </div>
          </div>
          <div className={styles.field + `${editing === '' ? '' : editing === 'address' ? ` ${styles.editing}` : ` ${styles.hide}`}`}>
            <div className={styles.icon + ` ${styles.address}`} />
            <p className={styles.value}>
              {user.address1 && (
                <>
                  <span>{user.address1}</span>
                  <br />
                </>
              )}
              {user.address2 && (
                <>
                  <span>{user.address2}</span>
                  <br />
                </>
              )}
              {user.city && <span>{user.city}, </span>}
              {user.state && <span>{user.state} </span>}
              {user.zipCode && <span>{user.zipCode}</span>}
            </p>
            <div className={styles.inputs}>
              <div className={styles.inputField}>
                <label htmlFor='Address Line 1'>Business address (line 1)</label>
                <input id='Address Line 1' className={styles.input} value={update['Address Line 1']} onChange={handleMakeUpdate} />
              </div>
              <div className={styles.inputField}>
                <label htmlFor='Address Line 2'>Business address (line 2)</label>
                <input id='Address Line 2' className={styles.input} value={update['Address Line 2']} onChange={handleMakeUpdate} />
              </div>
              <div className={styles.inputField}>
                <label htmlFor='City'>City<span className={styles.required}>*</span></label>
                <input id='City' className={styles.input} value={update.City} onChange={handleMakeUpdate} required />
              </div>
              <div className={styles.inputField}>
                <label htmlFor='State'>State<span className={styles.required}>*</span></label>
                <input id='State' className={styles.input} value={update.State} onChange={handleMakeUpdate} required />
              </div>
              <div className={styles.inputField}>
                <label htmlFor='ZIP'>ZIP</label>
                <input id='ZIP' className={styles.input} value={update.ZIP} onChange={handleMakeUpdate} />
              </div>
            </div>
            <div className={styles.buttons}>
              <p className={styles.edit} onClick={handleBeginEdit} title='address'>Edit</p>
              <p className={styles.save + `${!update.City || !update.State.trim() || (update['Address Line 1'].trim() === user.address1 && update['Address Line 2'].trim() === user.address2 && update.City.trim() === user.city && update.State.trim() === user.state && update.ZIP.trim() === user.zipCode) || (update.ZIP.trim().length && update.ZIP.trim().length !== 5) ? ` ${styles.error}` : ''}`} onClick={handleSave}>{!update.City.trim() ? 'City is required' : !update.State.trim() ? 'State is required' : update['Address Line 1'].trim() === user.address1 && update['Address Line 2'].trim() === user.address2 && update.City.trim() === user.city && update.State.trim() === user.state && update.ZIP.trim() === user.zipCode ? 'No changes to save' : update.ZIP.trim().length !== 5 && update.ZIP.trim().length ? 'ZIP should be five numbers long' : 'Save'}</p>
              <p className={styles.cancel} onClick={handleCancelEdit}>Cancel</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <div className={styles.fields}>
          <div className={styles.field + `${editing === '' ? '' : editing === 'name' ? ` ${styles.editing}` : ` ${styles.hide}`}`}>
            <div className={styles.icon + ` ${styles.name}`} />
            <p className={styles.value}>
              {user.firstName && <span>{user.firstName}</span>}
              {user.firstName && user.lastName && <span>&nbsp;</span>}
              {user.lastName && <span>{user.lastName}</span>}
            </p>
            <div className={styles.inputs}>
              <div className={styles.inputField}>
                <label htmlFor='First Name'>First Name<span className={styles.required}>*</span></label>
                <input id='First Name' className={styles.input} value={update['First Name']} onChange={handleMakeUpdate} required />
              </div>
              <div className={styles.inputField}>
                <label htmlFor='Last Name'>Last Name<span className={styles.required}>*</span></label>
                <input id='Last Name' className={styles.input} value={update['Last Name']} onChange={handleMakeUpdate} required />
              </div>
            </div>
            <div className={styles.buttons}>
              <p className={styles.edit} onClick={handleBeginEdit} title='name'>Edit</p>
              <p className={styles.save + `${!update['First Name'] || !update['Last Name'] || (update['First Name'].trim() === user.firstName && update['Last Name'].trim() === user.lastName) ? ` ${styles.error}` : ''}`} onClick={handleSave}>{!update['First Name'].trim() ? 'First Name is required' : !update['Last Name'].trim() ? 'Last Name is required' : update['First Name'].trim() === user.firstName && update['Last Name'].trim() === user.lastName ? 'No changes to save' : 'Save'}</p>
              <p className={styles.cancel} onClick={handleCancelEdit}>Cancel</p>
            </div>
          </div>
          <div className={styles.field + `${editing === '' ? '' : editing === 'phone' ? ` ${styles.editing}` : ` ${styles.hide}`}`}>
            <div className={styles.icon + ` ${styles.phone}`} />
            <p className={styles.value}>
              {user.phone && user.phone.length === 14 && (
                <>
                  <span>{user.phone.substr(1, 3)}</span>
                  <span>&nbsp;</span>
                  <span>{user.phone.substr(5, 4)}</span>
                  <span>&nbsp;</span>
                  <span>{user.phone.substr(10, 4)}</span>
                </>
              )}
            </p>
            <div className={styles.inputs}>
              <div className={styles.inputField}>
                <label htmlFor='Phone Number'>Phone number<span className={styles.required}>*</span></label>
                <input id='Phone Number' className={styles.input} value={update['Phone Number']} onChange={handleMakePhoneUpdate} required />
              </div>
            </div>
            <div className={styles.buttons}>
              <p className={styles.edit} onClick={handleBeginEdit} title='phone'>Edit</p>
              <p className={styles.save + `${!update['Phone Number'] || update['Phone Number'].length !== 10 || update['Phone Number'] === user.phone.replace(/[^0-9]/g, '') ? ` ${styles.error}` : ''}`} onClick={handleSave}>{!update['Phone Number'] ? 'Phone number is required' : update['Phone Number'].length !== 10 ? 'Phone number should be 10-digits' : update['Phone Number'] === user.phone.replace(/[^0-9]/g, '') ? 'No changes to save' : 'Save'}</p>
              <p className={styles.cancel} onClick={handleCancelEdit}>Cancel</p>
            </div>
          </div>
          <div className={styles.field + `${editing === '' ? '' : editing === 'email' ? ` ${styles.editing}` : ` ${styles.hide}`}`}>
            <div className={styles.icon + ` ${styles.email}`} />
            <p className={styles.value}>{user.email}</p>
            <div className={styles.inputs}>
              <div className={styles.inputField}>
                <label htmlFor='Email'>Email<span className={styles.required}>*</span></label>
                <input id='Email' className={styles.input} value={update.Email} onChange={handleMakeUpdate} required />
              </div>
            </div>
            <div className={styles.buttons}>
              <p className={styles.edit} onClick={handleBeginEdit} title='email'>Edit</p>
              <p className={styles.save + `${!update.Email.match(/\S+@\S+\.\S+/) || update.Email.trim() === user.email ? ` ${styles.error}` : ''}`} onClick={handleSave}>{!update.Email.trim().length ? 'Email is required' : !update.Email.match(/\S+@\S+\.\S+/) ? 'Not a valid email address' : update.Email.trim() === user.email ? 'No changes to save' : 'Save'}</p>
              <p className={styles.cancel} onClick={handleCancelEdit}>Cancel</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <h2 className={styles.sectionTitle}>Password</h2>
        <div className={styles.fields}>
          <div className={styles.field + `${editing === '' ? '' : editing === 'password' ? ` ${styles.editing}` : ` ${styles.hide}`}`}>
            <div className={styles.icon + ` ${styles.password}`} />
            <p className={styles.value}>&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;</p>
            <div className={styles.inputs}>
              <div className={styles.inputField}>
                <label htmlFor='Password'>New password<span className={styles.required}>*</span></label>
                <input type='password' id='Password' className={styles.input} value={update.Password} onChange={handleMakeUpdate} required />
              </div>
              <div className={styles.inputField}>
                <label htmlFor='passwordConfirm'>Confirm new password<span className={styles.required}>*</span></label>
                <input type='password' id='passwordConfirm' className={styles.input} value={update.passwordConfirm} onChange={handleMakeUpdate} required />
              </div>
            </div>
            <div className={styles.buttons}>
              <p className={styles.edit} onClick={handleBeginEdit} title='password'>Edit</p>
              <p className={styles.save + `${!update.Password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/) || update.Password !== update.passwordConfirm ? ` ${styles.error}` : ''}`} onClick={handleSave}>{!update.Password ? 'Password is required' : update.Password.length < 7 ? 'Enter 7-20 characters' : !update.Password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/) ? 'Use at least one lowercase character, one uppercase character, and one number' : update.Password !== update.passwordConfirm ? 'Confirmation password does not match' : 'Save'}</p>
              <p className={styles.cancel} onClick={handleCancelEdit}>Cancel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
