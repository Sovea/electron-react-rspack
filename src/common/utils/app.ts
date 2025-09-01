let PORT = 0;

/**
 * Get the current port number for the application.
 * @returns The current port number
 */
export function getPort() {
  return PORT;
}

/**
 * Set the port number for the application.
 * @param port - Port number to set
 */
export function setPort(port: number) {
  PORT = port;
}
