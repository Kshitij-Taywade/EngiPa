import React from "react";
import { useParams } from "react-router-dom";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

const PaperViewer = () => {
    const { id } = useParams();

    // Zoom Plugin
    const zoomPluginInstance = zoomPlugin();
    const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;

    // Page Navigation Plugin
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const {
        GoToPreviousPage,
        GoToNextPage,
        CurrentPageInput,
        NumberOfPages,
    } = pageNavigationPluginInstance;

    return (
        <div className="paperViewerContainer">

            <div className="viewerHeader">
                <h2>EngiPa Paper Viewer</h2>
            </div>

            {/* Custom Toolbar */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "30px",
                    padding: "15px",
                    background: "#1e1e1e",
                    color: "white",
                    flexWrap: "wrap",
                }}
            >
                {/* Zoom */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <ZoomOut />
                    <CurrentScale />
                    <ZoomIn />
                </div>

                {/* Page Navigation */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <GoToPreviousPage />

                    <CurrentPageInput />

                    <span>/</span>

                    <NumberOfPages />

                    <GoToNextPage />
                </div>
            </div>

            <div
                className="viewerBody"
                style={{
                    height: "85vh",
                }}
            >
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={`https://engipa-1.onrender.com/stream/${id}`}
                        plugins={[
                            zoomPluginInstance,
                            pageNavigationPluginInstance,
                        ]}
                    />
                </Worker>
            </div>

        </div>
    );
};

export default PaperViewer;