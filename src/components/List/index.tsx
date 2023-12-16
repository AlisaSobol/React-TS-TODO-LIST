import './index.scss'

interface ListItem {
  id: string,
  title: string,
  checked: boolean
}

interface ListProps {
  entries: ListItem[],
  removeById: (id: string) => void,
  checkHandler: (id: string) => void
}

const List = ({ entries, removeById, checkHandler }: ListProps) => {
  
  return (
    <ol className='list'>
      {entries.map((entry, index) => {
        return (
          <li className='list__item' key={index}>
            <input 
              type="checkbox" 
              id={entry.id} 
              checked={entry.checked} 
              onChange={() => checkHandler(entry.id)}
            />
            <label htmlFor={entry.id}>{entry.title}</label>
            <button 
              onClick={() => removeById(entry.id)}
            >delete</button>
          </li>
        )
      })}
    </ol> 
  )
}

export default List