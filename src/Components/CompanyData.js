import React, { useContext, useState, useEffect } from "react";
import { DropdownContext } from "../Utils/DropdownContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from "react-bootstrap/DropdownButton";
import { Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableBody, styled, tableCellClasses } from "@mui/material";
import Papa from "papaparse";
import { DataGrid } from '@mui/x-data-grid';
import CSVReader from "react-csv-reader";
import { 
    overall_negative, overall_objective, overall_positive, overall_extremes_objective, overall_extremes_subjective,
    AETOS_negative, AETOS_objective, AETOS_positive, AETOS_extremes_objective, AETOS_extremes_subjective,
    CandK_negative, CandK_objective, CandK_positive, CandK_extremes_objective, CandK_extremes_subjective,
    CW_negative, CW_objective, CW_positive, CW_extremes_objective, CW_extremes_subjective,
    CL_negative, CL_objective, CL_positive, CL_extremes_objective, CL_extremes_subjective,
    Dyson_negative, Dyson_objective, Dyson_positive, Dyson_extremes_objective, Dyson_extremes_subjective,  
    IHIS_negative, IHIS_objective, IHIS_positive, IHIS_extremes_objective, IHIS_extremes_subjective,
    KOandM_negative, KOandM_objective, KOandM_positive, KOandM_extremes_objective, KOandM_extremes_subjective,
    MI_negative, MI_objective, MI_positive, MI_extremes_objective, MI_extremes_subjective,
    Mediacorp_negative, Mediacorp_objective, Mediacorp_positive, Mediacorp_extremes_objective, Mediacorp_extremes_subjective,
    MFS_negative, MFS_objective, MFS_positive, MFS_extremes_objective, MFS_extremes_subjective,
    Navitas_negative, Navitas_objective, Navitas_positive, Navitas_extremes_objective, Navitas_extremes_subjective,
    OKX_negative, OKX_objective, OKX_positive, OKX_extremes_objective, OKX_extremes_subjective,
    PAC_negative, PAC_objective, PAC_positive, PAC_extremes_objective, PAC_extremes_subjective,
    RE_negative, RE_objective, RE_positive, RE_extremes_objective, RE_extremes_subjective,
    RWS_negative, RWS_objective, RWS_positive, RWS_extremes_objective, RWS_extremes_subjective,
    SCM_negative, SCM_objective, SCM_positive, SCM_extremes_objective, SCM_extremes_subjective,
    SMRT_negative, SMRT_objective, SMRT_positive, SMRT_extremes_objective, SMRT_extremes_subjective,
    STA_negative, STA_objective, STA_positive, STA_extremes_objective, STA_extremes_subjective,
    STE_negative, STE_objective, STE_positive, STE_extremes_objective, STE_extremes_subjective,
    SJ_negative, SJ_objective, SJ_positive, SJ_extremes_objective, SJ_extremes_subjective,
    TW_negative, TW_objective, TW_positive, TW_extremes_objective, TW_extremes_subjective
 } from "../data/index";

export const CompanyData = () => {
    const [title, setTitle] = useState('None');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [CSVData, setCSVData] = useState([]);
    const { display } = useContext(DropdownContext);
    var img1 = overall_positive;
    var img2 = overall_objective;
    var img3 = overall_negative;
    var file1 = overall_extremes_objective;
    var file2 = overall_extremes_subjective;
    var parsedFile = file1;
    var commonConfig = { delimiter: "," };
    var parsedData;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const getFiles = (file1, file2) => {
        fetch(file1).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                // alink.download = file1, file2;
                alink.download = file1;
                alink.click();
            })
        });

        /* fetch(file2).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = file2;
                alink.click();
            })
        }); */
    }

    const selectData = async (event) => {
        const id = event.target.id;
        setTitle(id);
        console.log(title);
        await getRows(file1, file2);
    }

    const getCsvData = async (file) => {
        await Papa.parse(
            file,
            {
                download: true,
                complete: (result) => {
                    setCSVData(convertToJSON(result.data));
                }
            }
        )
    }

    async function getRows(file1, file2) {
        switch (title) {
            case "Objective":
                await getCsvData(file1);
                break;
            case "Subjective":
                await getCsvData(file2);
                break;
            default:
                break;
        };

        /* Papa.parse(
            parsedFile,
            {
                ...commonConfig,
                header: true,
                download: true,
                complete: (result) => {
                    console.log("why");
                    setCSVData(result.data);
                }
            }
        ); */
        // console.log(CSVData);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /* const getDataFromFile = (title) => {
        switch 
    } */

    switch (display) {
        case "AETOS":
            img1 = AETOS_positive;
            img2 = AETOS_objective;
            img3 = AETOS_negative;
            file1 = AETOS_extremes_objective;
            file2 = AETOS_extremes_subjective;
            break;

        case "Charles & Keith":
            img1 = CandK_positive;
            img2 = CandK_objective;
            img3 = CandK_negative;
            file1 = CandK_extremes_objective;
            file2 = CandK_extremes_subjective;
            break;

        case "Cheil Worldwide":
            img1 = CW_positive;
            img2 = CW_objective;
            img3 = CW_negative;
            file1 = CW_extremes_objective;
            file2 = CW_extremes_subjective;
            break;

        case "Circles.Life":
            img1 = CL_positive;
            img2 = CL_objective;
            img3 = CL_negative;
            file1 = CL_extremes_objective;
            file2 = CL_extremes_subjective;
            break;

        case "Dyson":
            img1 = Dyson_positive;
            img2 = Dyson_objective;
            img3 = Dyson_negative;
            file1 = Dyson_extremes_objective;
            file2 = Dyson_extremes_subjective;
            break;

        case "Integrated Health Information System":
            img1 = IHIS_positive;
            img2 = IHIS_objective;
            img3 = IHIS_negative;
            file1 = IHIS_extremes_objective;
            file2 = IHIS_extremes_subjective;
            break;

        case "Keppel Offshore & Marine":
            img1 = KOandM_positive;
            img2 = KOandM_objective;
            img3 = KOandM_negative;
            file1 = KOandM_extremes_objective;
            file2 = KOandM_extremes_subjective;
            break;

        case "Mapletree Investments":
            img1 = MI_positive;
            img2 = MI_objective;
            img3 = MI_negative;
            file1 = MI_extremes_objective;
            file2 = MI_extremes_subjective;
            break;

        case "Mediacorp":
            img1 = Mediacorp_positive;
            img2 = Mediacorp_objective;
            img3 = Mediacorp_negative;
            file1 = Mediacorp_extremes_objective;
            file2 = Mediacorp_extremes_subjective;
            break;

        case "My First Skool":
            img1 = MFS_positive;
            img2 = MFS_objective;
            img3 = MFS_negative;
            file1 = MFS_extremes_objective;
            file2 = MFS_extremes_subjective;
            break;

        case "Navitas":
            img1 = Navitas_positive;
            img2 = Navitas_objective;
            img3 = Navitas_negative;
            file1 = Navitas_extremes_objective;
            file2 = Navitas_extremes_subjective;
            break;

        case "OKX":
            img1 = OKX_positive;
            img2 = OKX_objective;
            img3 = OKX_negative;
            file1 = OKX_extremes_objective;
            file2 = OKX_extremes_subjective;
            break;

        case "Panasonic Avionics Corporation":
            img1 = PAC_positive;
            img2 = PAC_objective;
            img3 = PAC_negative;
            file1 = PAC_extremes_objective;
            file2 = PAC_extremes_subjective;
            break;

        case "Recruit Express":
            img1 = RE_positive;
            img2 = RE_objective;
            img3 = RE_negative;
            file1 = RE_extremes_objective;
            file2 = RE_extremes_subjective;
            break;

        case "Resort World Sentosa":
            img1 = RWS_positive;
            img2 = RWS_objective;
            img3 = RWS_negative;
            file1 = RWS_extremes_objective;
            file2 = RWS_extremes_subjective;
            break;

        case "SembCorp Marine":
            img1 = SCM_positive;
            img2 = SCM_objective;
            img3 = SCM_negative;
            file1 = SCM_extremes_objective;
            file2 = SCM_extremes_subjective;
            break;

        case "SMRT":
            img1 = SMRT_positive;
            img2 = SMRT_objective;
            img3 = SMRT_negative;
            file1 = SMRT_extremes_objective;
            file2 = SMRT_extremes_subjective;
            break;

        case "ST Aerospace":
            img1 = STA_positive;
            img2 = STA_objective;
            img3 = STA_negative;
            file1 = STA_extremes_objective;
            file2 = STA_extremes_subjective;
            break;

        case "ST Engineering":
            img1 = STE_positive;
            img2 = STE_objective;
            img3 = STE_negative;
            file1 = STE_extremes_objective;
            file2 = STE_extremes_subjective;
            break;

        case "Surbana Jurong":
            img1 = SJ_positive;
            img2 = SJ_objective;
            img3 = SJ_negative;
            file1 = SJ_extremes_objective;
            file2 = SJ_extremes_subjective;
            break;

        case "Tribal Worldwide":
            img1 = TW_positive;
            img2 = TW_objective;
            img3 = TW_negative;
            file1 = TW_extremes_objective;
            file2 = TW_extremes_subjective;
            break;

        default:
            img1 = overall_positive;
            img2 = overall_objective;
            img3 = overall_negative;
            file1 = overall_extremes_objective;
            file2 = overall_extremes_subjective;
            break;
    }

    // data table
    useEffect(()=>{
        getCsvData(file1)
    }, [])

    function convertToJSON(array) {
        var objArray = [];
        for (var i = 1; i < array.length; i++) {
          objArray[i - 1] = {};
          for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
          }
        }
      
        return objArray;
      }

    const columns = [
        { field: '', headerName: 'ID', width: 70 },
        { field: 'company', headerName: 'Company', width: 90 },
        { field: 'date', headerName: 'Date', width: 100 },
        { field: 'rating',headerName: 'Rating', type: 'number', width: 60 },
        { field: 'position', headerName: 'Position', width: 150 },
        { field: 'subjectivity', headerName: 'Subjectivity', width: 90 },
        { field: 'sentiment', headerName: 'Sentiment', width: 90 },
        { field: 'text', headerName: 'Review', width: 700 },
      ];
      
    return (
        <>
            <div>
                <h3 className="inline-block-child">Company Data</h3>
                <DropdownButton className="inline-block-child" id="companySpecificData" title={title}>
                    <Dropdown.Item id="None" onClick={selectData}>None</Dropdown.Item>
                    <Dropdown.Item id="Objective" onClick={selectData}>Objective</Dropdown.Item>
                    <Dropdown.Item id="Subjective" onClick={selectData}>Subjective</Dropdown.Item>
                </DropdownButton>
                <button className="download inline-block-child" onClick={() => getFiles(file1, file2)}><b>Download All Data</b></button>
               
            </div>
            {/* getDataFromFile(title) */}

            <h3>Reviews</h3>
            <table>
                <thead>
                    {/*columns.map((column, id) => {
                        return (
                            <th key={id}>{column}</th>
                        );
                    })*/}
                </thead>
                <tbody>

                </tbody>
            </table>
            <h3>Word Clouds</h3>
            <div className="row">
                <div className="col">
                    <h4>Subjective (Positive Sentiment)</h4>
                    <img className="wordCloud" src={img1} alt="" />
                </div>

                <div className="col">
                    <h4>Subjective (Negative Sentiment)</h4>
                    <img className="wordCloud" src={img3} alt="" />
                </div>

                <div className="col">
                    <h4>Objective</h4>
                    <img className="wordCloud" src={img2} alt="" />
                </div>
            </div>
            <div style={{ height: 680, width: '100%', marginTop:'20px', marginBottom:'20px', padding:'15px', background:'white' }}>
                    <DataGrid
                        rows={CSVData}
                        columns={columns}
                        rowsPerPageOptions={[10]}
                        pageSize={10}
                        getRowId={(row) => row['']}
                    />
            </div>
            
        </>
    );
}