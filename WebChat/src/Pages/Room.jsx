import { useState, useEffect } from "react"
import client, { database , DATABASE_ID, COLLECTION_ID_MESSAGES } from "../appwriteConfig"
import { ID, Query } from "appwrite";
import {Trash2} from 'react-feather'

const Room = () => {

   const [messages, setMessages] = useState([]);
   const [messageBody, setMessageBody] = useState("");
   
  
  useEffect(() => {
    getMessages()

  const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
      
       if(response.events.includes("databases.*.collections.*.documents.*.create")){
        console.log('A MESSAGE WAS CREATED')
        setMessages(prevState => [response.payload, ...prevState])
       }

       if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        console.log('A MESSAGE WAS DELETED!!!')
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
       }
    })
    // console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let payload = {
      body:messageBody
    }
    
    let response = await database.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, 
        ID.unique(), 
        payload, 
       
    )
    // console.log('created!',response)

    // setMessages((prev) => {
    //   return [...prev, response]
    // })

    setMessageBody('')
  }

  const getMessages = async () => {
    const response = await database.listDocuments(
       DATABASE_ID, 
       COLLECTION_ID_MESSAGES,
       [
         Query.orderDesc("$createdAt"),
         Query.limit(20)
       ]
      )
    setMessages(response.documents)

  }

  const deleteMessage = async (message_id) => {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
    // setMessages(prevState => messages.filter(message => message.$id !== message_id))
  }

  return (
   <main className="container">

     <div className="room--container">
       <form id="message--form" onSubmit={handleSubmit} >
        <div>
          <textarea
          required
          maxLength={1000}
          placeholder="say something..."
          onChange={(e) => {setMessageBody(e.target.value)}}
          value={messageBody}
          >
          </textarea>
        </div>
        <div className="send-btn-wrapper">
          <input className="btn btn--secondary" type="submit" value="send" />
        </div>
       </form>

        <div>
          <div>{messages.map(message => (
            <div key={message.$id} className="message--wrapper">
        
            <div className="message--header">
              <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
              <Trash2 
                  className="message--btn"
                  onClick={() => {deleteMessage(message.$id)}}
              />
          
            </div>

              <div className="message--body">
               <span>
                  {message.body}
                </span>
              </div>
            </div>
           )
          )}
          </div>
        </div>
        </div>   
      </main> 
       
  )
}

export default Room