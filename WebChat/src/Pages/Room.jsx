import { useState, useEffect } from "react"
import { database , DATABASE_ID, COLLECTION_ID_MESSAGES } from "../appwriteConfig"

const Room = () => {

   const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = async () => {
    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES)
    setMessages(response.documents)

  }

  return (
   <main className="container">

     <div className="room--container">
        <div>
          <div>{messages.map(messages => (
            <div key={messages.$id} className="message--wrapper">
        
            <div className="message--header">
              <small className="message-timestamp">{messages.$createdAt}</small>
            </div>

              <div className="message--body">
               <span>
                  {messages.body}
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