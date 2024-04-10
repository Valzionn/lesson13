import { ChangeEvent, useState } from 'react'

type EditorProps = {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleSave: () => void
}

const Editor = ({ handleInputChange, handleSave }: EditorProps) => {
    return (
        <div>
            <p>Name: </p>
            <input
                style={{ border: '1px solid #eee' }}
                onChange={handleInputChange}
            ></input>
            <button style={{ border: '1px solid #eee' }} onClick={handleSave}>
                Save
            </button>
        </div>
    )
}

type DisplayValueProps = {
    displayValue: string
    shouldBeYellow: boolean
    id: number
    handleClick: (value: number) => void
    handleRemove: (id: number) => void
    isVisible: boolean
}

const DisplayValue = ({
    displayValue,
    handleClick,
    shouldBeYellow,
    id,
    handleRemove,
    isVisible
}: DisplayValueProps) => {
    return (
        <div
            className={`relative border my-2 w-32 h-24 flex justify-center items-center
            ${shouldBeYellow ? 'bg-yellow-200' : 'bg-red-700'}
            ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 cursor-pointer`}
            onClick={() => handleClick(id)}
        >
            <span>{displayValue}</span>
            <button
                className='absolute top-0 right-0 bg-red-200 p-1 rounded'
                onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(id);
                }}
            >
                X
            </button>

        </div >
    )
}

type DisplayValueType = {
    value: string
    shouldBeYellow: boolean
    id: number
    isVisible: boolean
}

const ShoppingList = () => {
    const [shouldShowEditor, setShouldShowEditor] = useState(false)
    const [inputValue, setInputValue] = useState<string | null>(null)
    const [displayValues, setDisplayValues] = useState<DisplayValueType[]>([])

    const handleShowEditor = () => setShouldShowEditor(s => !s)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleAddItem = () => {
        if (inputValue) {
            const id = Math.floor(Math.random() * 1000000)
            setDisplayValues([
                ...displayValues,
                {
                    value: inputValue,
                    shouldBeYellow: true,
                    id, 
                    isVisible: false
                }
            ])
            setTimeout(() => {
                setDisplayValues(currentValues =>
                  currentValues.map(item => 
                    item.id === id ? { ...item, isVisible: true } : item
                  )
                )
              }, 50)
        }
    }

    const handleClearDisplayValue = (idToColor: number) => {
        const newDisplayValues = displayValues.map(displayValue => {
          if (displayValue.id === idToColor) {
            return {
              ...displayValue, 
              shouldBeYellow: !displayValue.shouldBeYellow 
            };
          }
          return displayValue;
        });
      
        setDisplayValues(newDisplayValues);
      }

    const handleRemoveItem = (idToRemove: number) => {
        setDisplayValues(currentValues =>
            currentValues.map(item => 
              item.id === idToRemove ? { ...item, isVisible: false } : item
            )
        )
        setTimeout(() => {
            setDisplayValues(currentValues =>
                currentValues.filter(item => item.id !== idToRemove)
            )
        }, 500)
    }

    return (
        <div className='m-10'>
            <div className='mb-4'>
                <button style={{ border: '1px solid #eee' }} onClick={handleShowEditor}>
                    {shouldShowEditor ? 'Hide editor' : 'Show editor'}
                </button>
            </div>
            {shouldShowEditor ? (
                <Editor
                    handleInputChange={handleInputChange}
                    handleSave={handleAddItem}
                />
            ) : null}
            {displayValues.map(({ value, shouldBeYellow, id, isVisible }) => (
                <DisplayValue
                    key={id}
                    displayValue={value}
                    id={id}
                    handleClick={handleClearDisplayValue}
                    shouldBeYellow={shouldBeYellow}
                    handleRemove={handleRemoveItem}
                    isVisible={isVisible}
                />
            ))}
        </div>
    )
}

export default ShoppingList