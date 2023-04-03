package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", http.FileServer(http.Dir("./www")).ServeHTTP)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
