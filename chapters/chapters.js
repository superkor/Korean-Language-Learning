window.onload = function(){
    const chapterData = new XMLHttpRequest();
    chapterData.overrideMimeType("application/json");
    chapterData.open("GET", "../chapterDetails.json", true);

    chapterData.onload = function(){
        var divParent, chapterLinks;
        var data = JSON.parse(this.response);
        divParent = document.getElementsByClassName("dropdown-book1");
        for (var x = 0; x < Object.keys(data.book_one.chapters).length; x++){
            chapterLinks = document.createElement("a");
            chapterLinks.setAttribute("href", "#");
            chapterLinks.appendChild(document.createTextNode(data.book_one.chapters[x].title));
            divParent[0].appendChild(chapterLinks);
        }

        divParent = document.getElementsByClassName("dropdown-book2");
        for (var x = 0; x < Object.keys(data.book_two.chapters).length; x++){
            chapterLinks = document.createElement("a");
            chapterLinks.setAttribute("href", "#");
            chapterLinks.appendChild(document.createTextNode(data.book_two.chapters[x].title));
            divParent[0].appendChild(chapterLinks);
        }
    }

    chapterData.send();

    document.getElementById("test").textContent = localStorage.getItem("selectedBook");
    document.getElementById("test2").textContent = localStorage.getItem("selectedChapter");



}