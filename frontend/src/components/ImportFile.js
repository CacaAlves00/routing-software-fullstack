import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import saveFileIntoDatabase from '../api/saveFile'
import './ImportFile.css'

function ImportFile() {
    const [selectValue, setSelectValue] = useState('Entrega')
    const [errSaving, setErrSaving] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [chosenFile, setChosenFile] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.addEventListener('change', handleFiles, false);

        return () => {
            if (inputRef.current)
                inputRef.current.removeEventListener('change', handleFiles, false);
        }

    }, [])

    useEffect(() => {
        if (errSaving == null)
            return

        // setTimeout(() => {
        //     window.location.href = process.env.REACT_APP_FRONTEND_URL + 'list-deliveries'
        // }, 2000)
    }, [errSaving])

    function handleFiles(event) {
        setChosenFile(event.target.files[0])
    }

    function saveFile(file) {
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {

            const content = event.target.result

            const apiRes = await saveFileIntoDatabase(content, selectValue)
            setErrSaving(apiRes != null)
            setErrMsg(apiRes)

        }

        fileReader.readAsText(file);

    }

    function handleSelectChange(event) {
        setSelectValue(event.target.value)
    }


    return (
        <>
            <div id='import-file'>
                <div>
                    <input type='file' id='file' name='file' ref={inputRef} />
                </div>

                <div className='buttons'>
                    <select name='select' value={selectValue} onChange={handleSelectChange}>
                        <option value='Entrega'>Entrega</option>
                        <option value='Caminhão' selected>Caminhão</option>
                    </select>

                    <Button variant="primary" onClick={() => saveFile(chosenFile)} >
                        Salvar
                    </Button>
                </div>
            </div>

            {
                errSaving == null ? <></>
                    : (errSaving == false ?
                        <Alert className='import-file-alert' variant='primary'>
                            Arquivo salvo com sucesso !
                        </Alert>
                        :
                        <Alert className='import-file-alert' variant='danger'>
                            Falha ao enviar arquivo: {errMsg}
                        </Alert>
                    )
            }
        </>
    )
}

export default ImportFile