//QUIZ ILE ALAKALI JS

//Class mantığıyla oluşturuyoruz.
function Quiz(sorular) {
    //Sol kısım function'un oluşturduğu sorular. Parametre olarak gelen sorular'ı yönetebilmek için atadık.
    this.sorular = sorular;
    //Liste içindeki ilk soru için.
    this.soruIndex = 0;
    //Doğru cevap sayısı
    this.dogruCevapSayisi = 0;
  }
  
  //Quiz prototype içine function ekliyoruz.
  Quiz.prototype.soruGetir = function () {
    //Quiz içindeki sorular içinden o andaki soruIndex ne ise o soruyu getir.
    return this.sorular[this.soruIndex];
  };