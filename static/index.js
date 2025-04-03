
let port;

        async function selectSerialPort() {
                
                // Request a port from the user
                if ("serial" in navigator) {
                    try {
                        const port = await navigator.serial.requestPort();
                        const info = port.getInfo(); // Returns { usbVendorId, usbProductId }
                        alert(`Vendor ID: ${info.usbVendorId}, Product ID: ${info.usbProductId}`);
                        await port.open({ baudRate: 115200 });
                        document.getElementById("status").innerText = "Connected to COM Port";
                        // Continue with port operations
                    } catch (error) {
                        console.error("Error requesting port:", error);
                    }
                } else {
                    console.error("Web Serial API not supported.");
                }
                
                // Open the port with a baud rate (e.g., 115200)

                // Read data from the port
                readSerialData();
        }

        async function readSerialData() {
            const reader = port.readable.getReader();

            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        console.log("Serial stream closed");
                        break;
                    }
                    // Convert received data to text
                    let text = new TextDecoder().decode(value);
                    document.getElementById("data").innerText += text;
                }
            } catch (error) {
                console.error("Error reading serial data:", error);
            } finally {
                reader.releaseLock();
            }
        }

        document.getElementById("connectButton").addEventListener("click", selectSerialPort);

// let prevCount = 0;
// let selectedPortValue = "";  // Track the selected port

// async function loadPorts() {
//     try {
//         const response = await fetch("http://192.168.88.215:4449/get_ports");
//         const ports = await response.json();

//         const select = document.getElementById("portSelect");

//         const currentPortList = ports.map(port => port.device).sort(); // Get sorted list of ports
//         const currCount = currentPortList.length;

//         // Check if the port list changed
//         if (currCount !== prevCount) {
//             select.innerHTML = "";
//             console.log("Ports updated:", currentPortList);


//             // Update the UI with new ports
//             ports.forEach(port => {
//                 let option = document.createElement("option");
//                 option.value = port.device;
//                 option.textContent = port.name;

//                 if (port.device === selectedPortValue) {
//                     option.selected = true;
//                 }

//                 select.appendChild(option);
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching ports:", error);
//     }
// }
// function updateSelectedPort() {
//     let selectedOption = document.getElementById("portSelect").selectedOptions[0];
//     let fullText = selectedOption.textContent;
//     let match = fullText.match(/\((COM\d+)\)/);
//     if (match) {
//         let comPort = match[1];
//         fetch("/set_com_port", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ port: comPort })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log("Port sent to backend:", data);
//         })
//         .catch(error => {
//             console.error("Error sending port to backend:", error);
//         });
//     } else {
//         document.getElementById("selectedPortLabel").innerText = "No COM port found";
//         return;
//     }
//     // Display the selected port in the label
//     //document.getElementById("selectedPortLabel").innerText = `Selected COM Port: ${selectedPortValue}`;

    
// }

// // Get all navigation items
// const navItems = document.querySelectorAll('.nav-item');

// // Function to switch content in the right panel
// function changeContent(target) {
//     // Hide all content panels
//     const contentPanels = document.querySelectorAll('.content-panel');
//     contentPanels.forEach(panel => {
//         panel.classList.remove('active');
//     });

//     // Show the selected content panel
//     console.log(target);
//     const selectedContent = document.getElementById(target);
//     if (selectedContent) {
//         selectedContent.classList.add('active');
//     }
// }

// // Add event listeners to each navigation item
// navItems.forEach(item => {
//     item.addEventListener('click', () => {
//         // Get the target content ID from the data attribute
//         const targetContent = item.getAttribute('data-target');
//         changeContent(targetContent);
//     });
// });

// // Optionally, you can also set the initial active content if needed:
// changeContent('content1'); // Set the default content


// // Load ports on page load
// document.addEventListener("DOMContentLoaded", loadPorts);

