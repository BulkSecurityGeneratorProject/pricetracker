/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TrackPriceProductService } from 'app/entities/track-price-product/track-price-product.service';
import { ITrackPriceProduct, TrackPriceProduct } from 'app/shared/model/track-price-product.model';

describe('Service Tests', () => {
  describe('TrackPriceProduct Service', () => {
    let injector: TestBed;
    let service: TrackPriceProductService;
    let httpMock: HttpTestingController;
    let elemDefault: ITrackPriceProduct;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(TrackPriceProductService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TrackPriceProduct(0, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateTimePriceModified: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a TrackPriceProduct', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateTimePriceModified: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateTimePriceModified: currentDate
          },
          returnedFromService
        );
        service
          .create(new TrackPriceProduct(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a TrackPriceProduct', async () => {
        const returnedFromService = Object.assign(
          {
            currentPrice: 1,
            dateTimePriceModified: currentDate.format(DATE_TIME_FORMAT),
            pILD: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateTimePriceModified: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of TrackPriceProduct', async () => {
        const returnedFromService = Object.assign(
          {
            currentPrice: 1,
            dateTimePriceModified: currentDate.format(DATE_TIME_FORMAT),
            pILD: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateTimePriceModified: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TrackPriceProduct', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
